import { CodeIds } from './code-ids.enum';
import { CodeTypeIds } from './code-type-ids.enum';
import { Device } from './device';
import * as  _ from 'lodash';

export class DeviceTree {
  public items: any[];
  public constructor(mapping) {
    Object.assign(this, mapping);
    this.items = mapping.items;
  }

  public getDongs(): any[] {
    const dongs = [];
    this.items.forEach(item => {
      if (item.deleted !== 'Y' && item.typeId === CodeIds.PART_ELE_DONG) {
        dongs.push(item);
      }
    });
    return dongs;
  }

  public getAllDevicesAndDeviceGroups(): Device[] {
    let devices = [];
    this.items.forEach(dong => {
      if (dong.devices) {
        const dongDevices = <any[]> dong.devices;
        devices = devices.concat(_.filter(dongDevices, d => {
          if (!d) {
            return false;
          }
          if (!d.deleted) {
            return false;
          }
          return d.deleted !== 'Y';
        }));
      }
      if (!dong.items) {
        return;
      }
      dong.items.forEach(area => {
        if (!area.items) {
          return;
        }
        area.items.forEach(category => {
          if (!category.devices) {
            return;
          }
          const categoryDevices = <any[]> category.devices;
          devices = devices.concat(_.filter(categoryDevices, d => d.deleted !== 'Y'));
        });
      });
    });
    return devices.map(d => {
      return new Device(d);
    });
  }

  public getAllDevices(): Device[] {
    return _.filter(this.getAllDevicesAndDeviceGroups(), device => device.typeId && !device.typeId.startsWith(CodeTypeIds.DEVICE_GROUP));
  }
}
