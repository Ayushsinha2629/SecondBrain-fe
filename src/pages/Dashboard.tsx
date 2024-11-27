import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { CreateContent } from '../components/CreateContent'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { API_BASE_URL, REACT_BASE_URL } from '../config'

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false)
  const { contents, refreshContents } = useContent();
  const [filter, setFilter] = useState<string>("");

  const handleContentAdded = () => {
    refreshContents();
  };

  return (
    <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
      <Sidebar setFilter={setFilter}/>
    <div className='p-4'>
      <CreateContent onContentAdded={handleContentAdded} open={modelOpen} onClose = {() =>{
        setModelOpen(false)
      }}/>
    <div className='flex justify-between'>
      <span className="text-3xl font-bold">
        {filter ? `All ${filter === "twitter" ? "Tweets" : "YouTube Videos"}` : "All"}
      </span>
      <div className='flex gap-3'>
      <Button startIcon={<PlusIcon size={'lg'}/>} variant='primary' size='md' onClick={() => {setModelOpen(true)}} text='Add Content'/>
      <Button onClick={async()=>{
         try {
          const response = await axios.post(
            `${API_BASE_URL}/api/v1/content/brain/share`,
            { share: true },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          const shareUrl = `${REACT_BASE_URL}/${response.data.hash}`;
    
          await navigator.clipboard.writeText(shareUrl);
    
          alert("Share link copied to clipboard!");
        } catch (error) {
          console.error("Error sharing the brain:", error);
          alert("Failed to share the brain. Please try again.");
        }

      }} startIcon={<ShareIcon size={'lg'}/>} variant='secondary' size='md' text='Share Brain'/>
      </div>
    </div>
      <div className='flex gap-5 mt-7 flex-wrap'>
      {contents
        .filter(({ type }) => !filter || type === filter)
        .map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
        ))}
      </div>
      </div>
    </div>
  )
}
