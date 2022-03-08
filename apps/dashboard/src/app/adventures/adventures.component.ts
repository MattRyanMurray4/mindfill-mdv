import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adventure, emptyAdventure } from '@mindfill/api-interfaces';
import { AdventuresFacade } from '@mindfill/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'mindfill-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.scss'],
})
export class AdventuresComponent implements OnInit {
  form: FormGroup;
  adventures$: Observable<Adventure[]> = this.adventuresFacade.allAdventures$;
  selectedAdventure$: Observable<Adventure> =
    this.adventuresFacade.selectedAdventures$;
  constructor(
    private adventuresFacade: AdventuresFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.adventuresFacade.loadAdventures();
    this.resetAdventure();
  }

  selectAdventure(adventure: Adventure) {
    this.adventuresFacade.selectAdventure(adventure.id);
    this.form.patchValue(adventure);
  }

  resetAdventure() {
    this.selectAdventure(emptyAdventure);
    this.form.reset();
  }

  createAdventure(adventure: Adventure) {
    this.adventuresFacade.createAdventure(adventure);
    this.resetAdventure();
  }

  updateAdventure(adventure: Adventure) {
    this.adventuresFacade.updateAdventure(adventure);
    // this.resetAdventure()
  }

  saveAdventure(adventure: Adventure) {
    adventure.id
      ? this.adventuresFacade.updateAdventure(adventure)
      : this.adventuresFacade.createAdventure(adventure);
    this.resetAdventure();
  }

  deleteAdventure(adventure: Adventure) {
    this.adventuresFacade.deleteAdventure(adventure);
    // this.resetAdventure()
  }

  cancel() {
    this.resetAdventure();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: null,
      adventureName: ['', Validators.required],
      destination: ['', Validators.required],
      adventureDate: [''],
      mileage: [''],
      adventureComplete: [''],
    });
  }
}
