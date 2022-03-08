import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyIdea, Idea } from '@mindfill/api-interfaces';
import { IdeasFacade } from '@mindfill/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'mindfill-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
})
export class IdeasComponent implements OnInit {
  form: FormGroup;
  ideas$: Observable<Idea[]> = this.ideasFacade.allIdeas$;
  selectedIdea$: Observable<Idea> = this.ideasFacade.selectedIdeas$;
  constructor(
    private ideasFacade: IdeasFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ideasFacade.loadIdeas();
    this.initForm();
    this.resetForm();
  }

  selectIdea(idea: Idea) {
    this.ideasFacade.selectIdea(idea.id);
    this.form.patchValue(idea);
  }

  resetForm() {
    this.selectIdea(emptyIdea);
    this.form.reset();
  }

  createIdea(idea: Idea) {
    this.ideasFacade.createIdea(idea);
    this.resetForm();
  }

  updateIdea(idea: Idea) {
    this.ideasFacade.updateIdea(idea);
    // MAYBE RESET FORM
  }

  saveIdea(idea: Idea) {
    idea.id
      ? this.ideasFacade.updateIdea(idea)
      : this.ideasFacade.createIdea(idea);
    // MAYBE RESET FORM
  }

  deleteIdea(idea: Idea) {
    this.ideasFacade.deleteIdea(idea);
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      date: ['', Validators.required],
      ideaName: ['', Validators.required],
      description: ['', Validators.required],
      personal: [''],
      business: [''],
      romance: [''],
    });
  }
}
