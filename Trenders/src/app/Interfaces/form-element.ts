export interface FormElement {
    Name: string;
    Type: string;
    colSpan: number;
    Label: string;
    Property: {
        Validators: {
            Type: string;
            Value: number;
            ErrorMessage: string;
        }[];
        Hint: string;
    };
    Choices: { value: string }[];
}
