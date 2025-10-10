import { handleDrop, handleFileUpload } from '@/app/utils/calculatorUtils'
import useStore from '@/lib/store'
import { ArrowLeft } from 'lucide-react'
import React from 'react'


function ImageUpload({ setShowImageUpload }: { setShowImageUpload: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { uploadedImages } = useStore()

    return (
        <div className="p-6 space-y-4">
            <button
                onClick={() => setShowImageUpload(false)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ga terug
            </button>

            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            >
                <p className="text-gray-700 mb-2">Sleep bestanden hierheen of upload ze</p>
                <p className="text-sm text-gray-500 mb-4">Geaccepteerde bestandstypen: JPEG, PNG</p>
                <label className="inline-block">
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <span className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out">
                        Upload
                    </span>
                </label>
            </div>

            {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="w-full h-24 object-cover rounded" />
                    ))}
                </div>
            )}

            <button
                onClick={() => setShowImageUpload(false)}
                className="w-full bg-green-700 hover:bg-white cursor-pointer hover:text-green-700 hover:border-green-700 border border-green-700 text-white py-3 rounded font-medium"
            >
                Upload
            </button>
        </div>
    )
}

export default ImageUpload