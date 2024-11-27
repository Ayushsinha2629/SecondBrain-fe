import { useRef,useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./icons/CrossIcon";
import { Notification } from "./Notification";
import axios from "axios";
import {API_BASE_URL} from "../config";


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
// Controlled Component
export function CreateContent({open, onClose, onContentAdded}: { open: boolean; onClose: () => void; onContentAdded: () => void }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const typeRef = useRef<HTMLInputElement>();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;
    
        if (!title || !link || !type) {
          setMessage("All fields are required!");
          return;
        }
    
        try {
          setLoading(true);
          const response = await axios.post(
            `${API_BASE_URL}/api/v1/content/create`,
            { link, title, type },
            {
              headers: {
                Authorization: localStorage.getItem("token") || "",
              },
            }
          );
    
          setMessage("Content added successfully!");
          setShowToast(true)
          onContentAdded();
          console.log(response.data);
          setTimeout(() => {
            setShowToast(false)
            onClose();
          }, 2000)
        } catch (error) {
          console.error(error);
          setMessage("Failed to add content. Please try again.");
          setShowToast(true)
        } finally {
          setLoading(false);
        }
      }

    return <div>
        {open && 
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="absolute inset-0 bg-slate-500 opacity-60"></div>
            <div className="relative z-10 flex flex-col justify-center">
                <span className="bg-white p-4 rounded-md">
                    <div className="flex justify-between">
                        <div>
                            <span>
                                Add Content
                            </span>
                        </div>
                        <div className="cursor-pointer" onClick={onClose}>
                            <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <Input reference = {typeRef} type="dropdown"  />
                        <Input reference = {titleRef} placeholder={"Title"} />
                        <Input reference = {linkRef} placeholder={"Link"} />
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text={loading ? "Submitting..." : "Submit"} size="md"/>
                    </div>
                    {message && (
                    <Notification message={message} show={showToast} />
                    )}
                </span>
                
            </div>
        </div>
        }
    </div>
}

function Input({onChange, placeholder, reference, type}: {placeholder?: string; onChange?: () => void, reference?: any, type?: string}) {
    if (type === "dropdown") {
        return <select
            ref={reference}
            className="px-4 py-2 border rounded-md m-2 w-full bg-white"
            onChange={onChange}
        >
            <option value="" disabled selected>
            Select content type
            </option>
            {Object.values(ContentType).map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
            ))}
      </select>
    }
    return <div>
        <input ref={reference} placeholder={placeholder} type={type} className="px-4 py-2 border rounded-md m-2 w-full" onChange={onChange}></input>
    </div>
}