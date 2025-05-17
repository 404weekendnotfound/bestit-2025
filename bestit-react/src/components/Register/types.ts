export interface FormValues {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
    email: string;
    city: string;
    education: Array<{
        institution: string;
        degree: string;
        start_date: string;
        end_date: string;
    }>;
    work_experience: Array<{
        company: string;
        position: string;
        start_date: string;
        end_date: string;
    }>;
    degree?: string;
    fieldOfStudy?: string;
    graduationYear?: string;
    languages?: string;
    certificates?: string;
    additionalInfo?: string;
}

export interface StepProps {
    onNext?: (values: FormValues) => void;
    formData: FormValues;
    setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
} 