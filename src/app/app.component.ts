import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pawnX: number | null = null;
  pawnY: number | null = null;
  pawnDirection: string | null = null;
  pawnColor: string | null = null;
  reportGen: string = '';
  isFirstVisit : boolean = false;
  inputVal : string | null = null;

  constructor(){

  }

  placePawn(x: number, y: number, direction: string, color: string) {
    // CHECK TO STOP THE PAWN MOVING OUT OF THE BOARD
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return;
    }

    // AFTER CHECKING SETTING PAWN POSITION
    this.pawnX = x;
    this.pawnY = y;
    this.pawnDirection = direction;
    this.pawnColor = color;
    console.log(this.pawnX,this.pawnY,this.pawnDirection,this.pawnColor);
    
  }

  movePawn() {
    // CHECKING IF PAWN IS REALLY ON THE BOARD AND AFTER MOVING ITS NOT FALLING OFF
    if (this.pawnX === null || this.pawnY === null) {
      return;
    }

    let newX = this.pawnX;
    let newY = this.pawnY;

    // CALCULATING THE VALUE OF PAWN
    switch (this.pawnDirection) {
      case 'NORTH':
        newY += 1;
        break;
      case 'SOUTH':
        newY -= 1;
        break;
      case 'EAST':
        newX += 1;
        break;
      case 'WEST':
        newX -= 1;
        break;
    }

    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      return;
    }

    // UPDATE THE PAWN DIRECTION
    this.pawnX = newX;
    this.pawnY = newY;
  }

  rotateLeft() {
    // CHECKING IF PAWN IS ON BOARD
    if (this.pawnX === null || this.pawnY === null) {
      return;
    }

    // CHANGING PAWN'S DIRECTION
    switch (this.pawnDirection) {
      case 'NORTH':
        this.pawnDirection = 'WEST';
        break;
      case 'SOUTH':
        this.pawnDirection = 'EAST';
        break;
      case 'EAST':
        this.pawnDirection = 'NORTH';
        break;
      case 'WEST':
        this.pawnDirection = 'SOUTH';
        break;
    }
  }

  rotateRight() {
    // CHECKING IF PAWN IS ON BOARD
    if (this.pawnX === null || this.pawnY === null) {
      return;
    }

    // CHANGING PAWN'S DIRECTION
    switch (this.pawnDirection) {
      case 'NORTH':
        this.pawnDirection = 'EAST';
        break;
      case 'SOUTH':
        this.pawnDirection = 'WEST';
        break;
      case 'EAST':
        this.pawnDirection = 'SOUTH';
        break;
      case 'WEST':
        this.pawnDirection = 'NORTH';
        break;
    }
  }

  run(e:any){
    if(e.code === "Enter"){
      this.report(this.inputVal);
    }
  }

  report(value:any) {
    // EMPTYING THE VALUES OF THE REPORT AREA & INPUT BOX
    this.reportGen = "";
    value = value.toUpperCase().trim();
    this.inputVal = ""

    // CHECKING FOR THE FIRST COMMAND AS PLACE COMMAND
    if( !this.isFirstVisit && !value.includes('PLACE')) {
      this.reportGen = "Please Enter Correct Command"
    }else {
      // CHECKING IF VALUES IN PLACE COMMAND ARE CORRECT OR NOT
      if(value.includes('PLACE')){
        let spliceString = value.split(' ');
        let valueVar = spliceString[1].split(',');
        if(valueVar.length == 4) {
          this.reportGen = "";
          this.isFirstVisit = true;
          this.placePawn(+valueVar[0],+valueVar[1],valueVar[2],valueVar[3]);
        }
        else {
          this.reportGen = "Please Enter Correct Command"
        }
       }
      // CALLING FUNCTIONALITY BASED ON THE COMMAND
       else if(value.includes('MOVE')){
        this.movePawn();
       }
       else if(value.includes('LEFT')){
        this.rotateLeft();
       }
       else if(value.includes('RIGHT')){
        this.rotateRight();
       }
       else if(value.includes('REPORT')){
        this.reportGen = this.pawnX + "," + this.pawnY + "," + this.pawnDirection  + "," + this.pawnColor;
       }
    }
  }
}
