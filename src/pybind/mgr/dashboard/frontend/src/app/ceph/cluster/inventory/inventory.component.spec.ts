import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { configureTestBed, i18nProviders } from '../../../../testing/unit-test-helper';
import { OrchestratorService } from '../../../shared/api/orchestrator.service';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryDevicesComponent } from './inventory-devices/inventory-devices.component';
import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let orchService: OrchestratorService;

  configureTestBed({
    imports: [FormsModule, SharedModule, HttpClientTestingModule, RouterTestingModule],
    providers: [i18nProviders],
    declarations: [InventoryComponent, InventoryDevicesComponent]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    orchService = TestBed.get(OrchestratorService);
    spyOn(orchService, 'status').and.returnValue(of({ available: true }));
    spyOn(orchService, 'inventoryDeviceList').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('after ngOnInit', () => {
    it('should load devices', () => {
      fixture.detectChanges();
      expect(orchService.inventoryDeviceList).toHaveBeenCalledWith(undefined);
    });

    it('should load devices for a host', () => {
      component.hostname = 'host0';
      fixture.detectChanges();
      expect(orchService.inventoryDeviceList).toHaveBeenCalledWith('host0');
    });
  });
});
