interface DetailsQuestion {
    question: string;
    student: string;
    class: string;
    tags?: string; 
    submitAt: string;
    answered: boolean;
}

interface AnsweredQuestion {
    question: string;
    student: string;
    class: string;
    tags?: string; 
    submitAt: string;
    answered: boolean;
    answeredAt?: string;
    answer?: string;
    answeredBy?: string;
}

interface UnansweredQuestion{
    id: number;
    question: string;
    student: string;
    class: string;
    submitAt: string;
}

export {
    DetailsQuestion,
    AnsweredQuestion,
    UnansweredQuestion,
}
