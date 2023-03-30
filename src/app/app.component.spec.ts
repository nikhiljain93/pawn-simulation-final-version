import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should place pawn', () => {
    component.placePawn(0, 0, 'NORTH', 'WHITE');
    expect(component.pawnX).toEqual(0);
    expect(component.pawnY).toEqual(0);
    expect(component.pawnDirection).toEqual('NORTH');
    expect(component.pawnColor).toEqual('WHITE');
  });

  it('should move pawn due NORTH', () => {
    component.placePawn(0, 0, 'NORTH', 'WHITE');
    component.movePawn();
    expect(component.pawnX).toEqual(0);
    expect(component.pawnY).toEqual(1);
    expect(component.pawnDirection).toEqual('NORTH');
    expect(component.pawnColor).toEqual('WHITE');
  });

  it('should move pawn due SOUTH', () => {
    component.placePawn(0, 1, 'SOUTH', 'BLACK');
    component.movePawn();
    expect(component.pawnX).toEqual(0);
    expect(component.pawnY).toEqual(0);
    expect(component.pawnDirection).toEqual('SOUTH');
    expect(component.pawnColor).toEqual('BLACK');
  });

  it('should move pawn due EAST', () => {
    component.placePawn(0, 0, 'EAST', 'WHITE');
    component.movePawn();
    expect(component.pawnX).toEqual(1);
    expect(component.pawnY).toEqual(0);
    expect(component.pawnDirection).toEqual('EAST');
    expect(component.pawnColor).toEqual('WHITE');
  });

  it('should move pawn due WEST', () => {
    component.placePawn(2, 0, 'WEST', 'BLACK');
    component.movePawn();
    expect(component.pawnX).toEqual(1);
    expect(component.pawnY).toEqual(0);
    expect(component.pawnDirection).toEqual('WEST');
    expect(component.pawnColor).toEqual('BLACK');
  });

  it('should rotate pawn left', () => {
    component.placePawn(0, 0, 'NORTH', 'WHITE');
    component.rotateLeft();
    expect(component.pawnX).toEqual(0);
    expect(component.pawnY).toEqual(0);
    expect(component.pawnDirection).toEqual('WEST');
    expect(component.pawnColor).toEqual('WHITE');
  });

  it('should rotate pawn right', () => {
    component.placePawn(0, 0, 'NORTH', 'WHITE');
    component.rotateRight();
    expect(component.pawnX).toEqual(0);
    expect(component.pawnY).toEqual(0);
    expect(component.pawnDirection).toEqual('EAST');
    expect(component.pawnColor).toEqual('WHITE');
  });

it('should set reportGen to "Please Enter Correct Command" if PLACE is not first Command', () => {
    component.isFirstVisit = false;
    component.report('some value');
    expect(component.reportGen).toEqual('Please Enter Correct Command');
  });

  it('should set reportGen to "" and call placePawn function if PLACE is the first command and with valid values', () => {
    const value = 'PLACE 1,2,NORTH,WHITE';
    spyOn(component, 'placePawn');
    component.report(value);
    expect(component.reportGen).toEqual('');
    expect(component.isFirstVisit).toEqual(true);
    expect(component.placePawn).toHaveBeenCalledWith(1, 2, 'NORTH', 'WHITE');
  });

  it('should set reportGen to "Please Enter Correct Command" is having valid values', () => {
    const value = 'PLACE 1,2,NORTH';
    component.report(value);
    expect(component.reportGen).toEqual('Please Enter Correct Command');
  });

  it('should call movePawn function if value includes "MOVE"', () => {
    const value = 'PLACE 1,2,NORTH,WHITE';
    component.report(value);
    spyOn(component, 'movePawn');
    component.report('MOVE');
    expect(component.movePawn).toHaveBeenCalled();
  });

  it('should not change the direction if the pawn is not on board', () => {
    component.pawnX = null;
    component.pawnY = null;
    const originalDirection = component.pawnDirection;
    component.rotateLeft();
    expect(component.pawnDirection).toEqual(originalDirection);
  });

  it('should change the direction to the left if the pawn is on board', () => {
    component.pawnX = 1;
    component.pawnY = 2;
    component.pawnDirection = 'NORTH';
    component.rotateLeft();
    expect(component.pawnDirection).toEqual('WEST');
    component.rotateLeft();
    expect(component.pawnDirection).toEqual('SOUTH');
    component.rotateLeft();
    expect(component.pawnDirection).toEqual('EAST');
    component.rotateLeft();
    expect(component.pawnDirection).toEqual('NORTH');
  });

it('should not change the direction if the pawn is not on board for RIGHT', () => {
    component.pawnX = null;
    component.pawnY = null;
    const originalDirection = component.pawnDirection;
    component.rotateRight();
    expect(component.pawnDirection).toEqual(originalDirection);
  });

  it('should change the direction to the right if the pawn is on board', () => {
    component.pawnX = 1;
    component.pawnY = 2;
    component.pawnDirection = 'NORTH';
    component.rotateRight();
    expect(component.pawnDirection).toEqual('EAST');
    component.rotateRight();
    expect(component.pawnDirection).toEqual('SOUTH');
    component.rotateRight();
    expect(component.pawnDirection).toEqual('WEST');
    component.rotateRight();
    expect(component.pawnDirection).toEqual('NORTH');
  });

  it('should set reportGen if value includes "REPORT"', () => {
    const value = 'PLACE 1,2,NORTH,BLACK';
    component.report(value);
    component.report('REPORT');
    expect(component.reportGen).toEqual('1,2,NORTH,BLACK');
  });

  it('should call report function if code is "Enter"', () => {
    spyOn(component, 'report');
    const event = new KeyboardEvent('keydown', { code: 'Enter' });
    component.run(event);
    expect(component.report).toHaveBeenCalledWith(component.inputVal);
  });

  it('should not call report function if code is not "Enter"', () => {
    spyOn(component, 'report');
    const event = new KeyboardEvent('keydown', { code: 'Escape' });
    component.run(event);
    expect(component.report).not.toHaveBeenCalled();
  });

});