export class Device {
  public id: string;
  public nameKo: string;
  public nameEn: string;
  public nameCn: string;
  public nameRu: string;
  public seq: number;
  public typeId: string;
  public info: any;

  constructor(mapping) {
    this.id = <string> mapping.id;
    this.nameKo = <string> mapping.nameKo;
    this.nameEn = <string> mapping.nameEn;
    this.nameCn = <string> mapping.nameCn;
    this.nameRu = <string> mapping.nameRu;
    this.seq = <number> mapping.seq;
    this.typeId = <string> mapping.typeId;
    this.info = mapping.info;
  }
}
