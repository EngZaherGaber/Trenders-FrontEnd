import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElement } from 'src/app/Interfaces/form-element';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilderService } from 'src/app/Services/form-builder.service';
import { MaterialModule } from '../../Material/Material.module';
import { MatDialog } from '@angular/material/dialog';
import { FormViewerComponent } from '../../Company-Components/form-viewer/form-viewer.component';
@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, MaterialModule, CdkDropList, FormsModule, ReactiveFormsModule, CdkDrag],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {
  //For Steps
  activeIndex = 0;
  status: string[];
  //For First Step ===> Form
  //For Second Step  ===> Dynamic Form
  elements: any[];
  proccess;
  creatElements: any[];
  validators: any[];
  @ViewChild('form') formDesign: ElementRef;
  columns: number = 1;
  FullInfo: any;
  //====> For Element Property
  form: FormGroup = this.fb.group({
    title: this.fb.control('', Validators.required),
    Name: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    img: this.fb.control('', Validators.required),
  });
  // id: number;
  // title: string;
  // description: string;
  // institute: Institution;
  // details: any[];
  // img: string;
  selectedElement: FormElement;
  SelectedValidators: any[];
  Types = [];
  //Constructor
  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private FBS: FormBuilderService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  ngOnInit() {

    this.status = ['Active', 'Draft', 'Disabled'];
    this.elements = this.FBS.getElements();

    // this.selectedElement.colSpan = 1;
    this.creatElements = [];

  }
  AddValidators() {
    this.SelectedValidators.forEach((element) => {
      const index = this.selectedElement.Property.Validators.findIndex(
        (x) => x.Type === element
      );
      if (index === -1) {
        this.validators = this.getValidator();
        const valid = this.validators.find((x) => {
          return x.Type === element;
        });
        this.selectedElement.Property.Validators.push(valid);
      }
    });
    if (this.selectedElement.Property.Validators.length > 0) {
      for (
        let i = 0;
        i < this.selectedElement.Property.Validators.length;
        i++
      ) {
        const element = this.selectedElement.Property.Validators[i];

        const index = this.SelectedValidators.findIndex(
          (x) => x === element.Type
        );
        if (index === -1) {
          this.selectedElement.Property.Validators.splice(i, 1);
        }
      }
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (event.container.element.nativeElement.classList.contains('design-list')) {
        this.elements = this.FBS.getElements();
        this.Edit(this.creatElements[event.currentIndex]);
      }
      else {
        this.selectedElement = undefined;
      }
    }
    // this.selectedElement =
  }
  Edit(item: FormElement) {

    this.validators = this.FBS.getValidators(item);
    this.selectedElement = item;
    if (this.selectedElement.Name === 'Select Menu') {
      this.Types = ['single', 'multiple']

    } else if (this.selectedElement.Name === 'Input') {

      this.Types = ['text', 'number', 'date']
    }
    if (item.Property.Validators.length > 0) {
      this.SelectedValidators = item.Property.Validators.map((x) => x.Type);
    } else {
      this.SelectedValidators = [];
    }
    // this.selectedElement.Property.Validators
  }
  Delete(i) {
    this.creatElements.splice(i, 1);
    this.selectedElement = undefined;
  }
  getValidator() {
    const arr = this.FBS.getValidators(this.selectedElement);
    return arr;
  }
  addNewChoice() {
    this.selectedElement.Choices.push({ value: '' });
  }
  openDialog() {
    this.FullInfo = {
      title: this.form.value.title,
      desciption: this.form.value.description,
      img: this.form.value.img,
      details: this.creatElements,
    }
    const dialogRef = this.dialog.open(FormViewerComponent, {
      data: this.FullInfo,
      height: '60vh',
      width: '60vw',
    });


  }
}
