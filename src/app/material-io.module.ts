/**
 * Created by patrick on 10/4/17.
 */
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatTabsModule } from '@angular/material';
import { MatSidenavModule, MatExpansionModule } from '@angular/material';
import { MatSidenav, MatAccordion, MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSidenav,
    MatAccordion,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule
  ],
})
export class MaterialIoModule { }
