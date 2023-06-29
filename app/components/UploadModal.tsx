'use client'
// TODO: External library
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";

// TODO: Internal library
import useUploadModal from "@/hooks/useUploadModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  // TODO: State
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()
  const router = useRouter()

  // TODO: Hooks
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit = async (values: Record<string, any>) => {
    try {
      setIsLoading(true)

      const trimTitle = values.title.trim()
      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile) {
        toast.error('Please select a song and an image')
        return
      }

      // TODO: upload songs and images to storage
      const { data: songData, error: songError } = await supabaseClient
        .storage
        .from('songs')
        .upload(`songs/${trimTitle}/${uniqid()}`, songFile, { cacheControl: '3600', upsert: false })

      if (songError) {
        toast.error('Error uploading song')
        return
      }

      const { data: imageData, error: imageError } = await supabaseClient
        .storage
        .from('images')
        .upload(`images/${trimTitle}/${uniqid()}`, imageFile, { cacheControl: '3600', upsert: false })

      if (imageError) {
        toast.error('Error uploading image')
        return
      }

      // Create record 
      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh()
      toast.success('Song uploaded successfully')
      reset()
      uploadModal.onClose()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a new song"
      description="Add a new song to your playlist"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input 
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          { ...register('title', { required: true }) }
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}
 
export default UploadModal;