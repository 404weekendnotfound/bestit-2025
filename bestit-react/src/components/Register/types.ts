export interface FormValues {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
    email: string;
    city: string;
    education?: string;
    degree?: string;
    fieldOfStudy?: string;
    graduationYear?: string;
    languages?: string;
    certificates?: string;
    additionalInfo?: string;
    jobs?: Array<{
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
}

export interface StepProps {
    onNext?: (values: FormValues) => void;
    formData: FormValues;
    setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
} 