import React, { useState } from 'react'
import { useForm } from "react-hook-form";

import { createLogEntry } from './api';

export default function LogEntryForm({location, onClose}) {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const      [ loading, setLoading] = useState(false)
   
    const onSubmit = async (data) => {  
        try {
            setLoading(true)
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data)
            console.log(created);
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
        setLoading(false)
        onClose()
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        { error ? <h3 className="error">{error}</h3> : null}
        {/* <label htmlFor="apiKey">API KEY</label>
        <input type="password" name="apiKey" required {...register('title')} /> */}
        <label htmlFor="title">Title</label>
        <input name="title" required {...register('title')} />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows={3} {...register('comments')}></textarea>
        <label htmlFor="description">Description</label>
        <textarea name="description" rows={3} {...register('description')}></textarea>
        <label htmlFor="image">Image</label>
        <input name="image" {...register('image')} />
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" required {...register('visitDate')} />
        <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
      </form>  
      
    )
}
