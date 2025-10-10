import { ArrowLeft } from 'lucide-react'
import React from 'react'
import useStore from '@/lib/store'

interface ContactFormProps {
    onBack?: () => void
    onSubmit?: () => void
}

function ContactForm({ onBack, onSubmit }: ContactFormProps) {
    const contactInfo = useStore(s => s.contactInfo)
    const setContactField = useStore(s => s.setContactField)
    const showThankYou = useStore(s => s.showThankYou)
    const setShowThankYou = useStore(s => s.setShowThankYou)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Parent may also perform submission; we flip the thank you state here
        setShowThankYou(true)
        onSubmit?.()
    }

    return (
        <div className="space-y-4">
            <button
                onClick={() => onBack?.()}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vorige
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-2">
                        E-mailadres<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Vul hier in"
                        value={contactInfo.email}
                        onChange={(e) => setContactField('email', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Telefoonnummer<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Vul hier in"
                        value={contactInfo.telephone}
                        onChange={(e) => setContactField('telephone', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-2">
                            Achternaam<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Vul hier in"
                            value={contactInfo.surname}
                            onChange={(e) => setContactField('surname', e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">
                            Postcode<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Vul hier in"
                            value={contactInfo.zipCode}
                            onChange={(e) => setContactField('zipCode', e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-2">
                            Straat / Huisnummer<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Vul hier in"
                            value={contactInfo.street}
                            onChange={(e) => setContactField('street', e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">
                            Woonplaats<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Vul hier in"
                            value={contactInfo.residence}
                            onChange={(e) => setContactField('residence', e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm