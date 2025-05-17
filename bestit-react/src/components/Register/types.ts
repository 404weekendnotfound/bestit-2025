export interface FormValues {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
    email: string;
    city: string;
    education: {
        institution: string;
        degree: string;
        field: string;
        start_date: string;
        graduation_date: string;
    }[];
    work_experience: {
        company: string;
        position: string;
        start_date: string;
        end_date: string;
    }[];
    skills: {
        name: string;
        level: string;
    }[];
    certifications: {
        name: string;
        date: string;
    }[];
    interests: string[];
    additionalInfo?: string;
    cv?: string;
    photo?: string;
    degree?: string;
    fieldOfStudy?: string;
    graduationYear?: string;
    languages?: string;
}

export interface StepProps {
    onNext?: (values: FormValues) => void;
    formData: FormValues;
    setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
} 