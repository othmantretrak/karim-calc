import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
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

    const [focused, setFocused] = useState<string | null>(null)

    const isEmailValid = contactInfo.email.includes('@')
    const isTelephoneValid = /^\d{1,10}$/.test(contactInfo.telephone)
    const isZipValid = /^\d{4}\s?[a-zA-Z]{2}$/.test(contactInfo.zipCode)
    const isStreetValid = contactInfo.street.trim() !== ''
    const isResidenceValid = contactInfo.residence.trim() !== ''
    const isSurnameValid = !/\d/.test(contactInfo.surname)

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
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {focused === 'email' && !isEmailValid && (
                        <p className="text-sm text-red-500 mt-1">Voer een geldig e-mailadres in (moet &quot;@&quot; bevatten).</p>
                    )}
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
                        onFocus={() => setFocused('telephone')}
                        onBlur={() => setFocused(null)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {focused === 'telephone' && !isTelephoneValid && (
                        <p className="text-sm text-red-500 mt-1">Voer een geldig telefoonnummer in (1–10 cijfers).</p>
                    )}
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
                            onFocus={() => setFocused('surname')}
                            onBlur={() => setFocused(null)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {focused === 'surname' && !isSurnameValid && (
                            <p className="text-sm text-red-500 mt-1">Achternaam mag geen cijfers bevatten.</p>
                        )}
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
                            onFocus={() => setFocused('zipCode')}
                            onBlur={() => setFocused(null)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {focused === 'zipCode' && !isZipValid && (
                            <p className="text-sm text-red-500 mt-1">Voer een geldige postcode in (bv. 1234 AB).</p>
                        )}
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
                            onFocus={() => setFocused('street')}
                            onBlur={() => setFocused(null)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {focused === 'street' && !isStreetValid && (
                            <p className="text-sm text-red-500 mt-1">Straat en huisnummer mogen niet leeg zijn.</p>
                        )}
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
                            onFocus={() => setFocused('residence')}
                            onBlur={() => setFocused(null)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {focused === 'residence' && !isResidenceValid && (
                            <p className="text-sm text-red-500 mt-1">Woonplaats mag niet leeg zijn.</p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm