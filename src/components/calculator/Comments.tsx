import { ArrowLeft } from 'lucide-react'
import React from 'react'

interface CommentsProps {
    comments: string;
    setComments: (c: string) => void;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
}

function Comments({ comments, setComments, setShowComments }: CommentsProps) {
    return (


        <div className="p-6 space-y-4">
            <button
                onClick={() => setShowComments(false)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ga terug
            </button>

            <div>
                <label className="block font-medium mb-2">Opmerkingen</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Laat hier je opmerking(en) achter"
                    className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
            </div>

            <button
                onClick={() => setShowComments(false)}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded font-medium"
            >
                Opslaan
            </button>
        </div>

    )
}

export default Comments