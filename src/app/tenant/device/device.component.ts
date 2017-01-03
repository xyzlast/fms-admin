import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../shared/services/tenant.service';
import { Broadcaster } from '../../shared/utils';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  public devices: any[];
  constructor(private tenantService: TenantService,
    private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.broadcaster.on<any>('onSelectedTenant').subscribe(tenant => {
      this.fillDevices(tenant);
    });

    const tenantJson = localStorage.getItem('selectedTenant');
    if (tenantJson) {
      const tenant = JSON.parse(tenantJson);
      this.fillDevices(tenant);
    }
  }

  fillDevices(tenant) {
    this.tenantService.getDeviceTree(tenant.id).then(deviceTree => {
      this.devices = deviceTree.getAllDevices();
      console.log(this.devices);
    });
  }
}
