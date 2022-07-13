// export const SERVER_API = 'http://192.168.254.100:5002/api';
// export const SERVER_URI = 'http://192.168.254.100:5002/';
// export const SERVER_API = 'http://localhost:5002/api';
// export const SERVER_URI = 'http://localhost:5002/';
export const SERVER_API = 'https://dtas.ejcubillas.com/api';
export const SERVER_URI = 'https://dtas.ejcubillas.com/';

export const JWT = 'dtas-ocr-tkn';
export const PRE = 'dtas-ocr';
export const PRE_STU = 'dtas-ocr-student';
export const JWT_STU = 'dtas-ocr-student-tkn';

export const DOCUMENT_TYPES = [
    {text: "", value: ""},
    {text: "Student Personal Record", value: "spr"},
    {text: "Authenticated Birth Certificate", value: "nso"},
    {text: "Form 138", value: "form138"},
    {text: "Good Moral Character ", value: "gmc"},
    {text: "Medical Examination", value: "medical"},
    {text: "Enrolment Draft", value: "enrollment"},
    {text: "Entrance Exam Results", value: "exam"},
    {text: "Grade Completion form", value: "completion"},
    {text: "Dropping", value: "dropping"},
    {text: "Changing", value: "changing"},
    {text: "Withdrawal", value: "withdrawal"},
    {text: "Subject Request", value: "subRequest"},
    {text: "Unit Override", value: "unitover"},
    {text: "Subject Course Offering", value: "sco"},
    {text: "Equipment Borrower Slip", value: "ebs"},
];


export const DOCUMENT_TYPES2 = {
    "spr": "SPR",
    "nso": "NSO",
    "form138": "Form 138",
    "gmc": "GMC",
    "medical": "Medical",
    "enrollment": "Enrollment",
    "exam": "Exam Result",
    "completion": "Grade Completion",
    "dropping": "Dropping",
    "changing": "Changing",
    "withdrawal": "Withdrawal",
    "subRequest": "Subject Request",
    "unitover": "Unit Override",
    "sco": "Course Offering",
    "ebs": "Borrower Slip",
};
