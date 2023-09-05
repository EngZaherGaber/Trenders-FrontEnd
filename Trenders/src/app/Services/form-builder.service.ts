import { Injectable } from '@angular/core';
import { FormElement } from '../Interfaces/form-element';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  getElements() {
    const elements: FormElement[] = [
      {
        Name: 'Input',
        Type: 'text',
        colSpan: 1,
        Label: '',
        Property: {
          Validators: [],
          Hint: '',
        },
        Choices: [],
      },
      {
        Name: 'Select Menu',
        Type: '',
        colSpan: 1,
        Label: '',
        Property: {
          Validators: [],
          Hint: '',
        },
        Choices: [],
      },
      {
        Name: 'TextArea',
        Type: '',
        Label: '',
        colSpan: 1,
        Property: {
          Validators: [],
          Hint: '',
        },
        Choices: [],
      },
      {
        Name: 'Uploader',
        Type: '',
        Label: '',
        colSpan: 1,
        Property: {
          Validators: [],
          Hint: '',
        },
        Choices: [],
      },

    ];
    return elements;
  }
  getValidators(selectedElement: any) {
    let validators: {
      Type: string;
      Value: string;
      elements: string[];
      ErrorMessage: string;
    }[] = [
        {
          Type: 'required',
          Value: '',
          elements: [
            'Input text',
            'Input number',
            'Input email',
            'Input date',
            'TextArea',
            'Select Menu',
            'CheckBox',
            'Radio Button',
          ],
          ErrorMessage: '',
        },
        {
          Type: 'email',
          Value: '',
          elements: ['Input text'],
          ErrorMessage: '',
        },
        {
          Type: 'minlength',
          Value: '',
          elements: ['Input text', 'TextArea'],
          ErrorMessage: '',
        },
        {
          Type: 'maxlength',
          Value: '',
          elements: ['Input text', 'TextArea'],
          ErrorMessage: '',
        },
        {
          Type: 'min',
          Value: '',
          elements: ['Input number', 'Input date'],
          ErrorMessage: '',
        },
        {
          Type: 'max',
          Value: '',
          elements: ['Input number', 'Input date'],
          ErrorMessage: '',
        },
      ];

    if (selectedElement === undefined) {
      return validators;
    }
    const name = selectedElement.Name + ' ' + selectedElement.Type;

    let arr = validators.filter((x) => x.elements.includes(name.trim()));
    return arr;
  }
  constructor() { }

}
