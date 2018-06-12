export class PuntoVentaDetalle {
  public Id: number;
  public PuntoVentaId: number;
  public Codigo: number;
  public Descripcion: number;
  public Serie: string;
  public Cantidad = 0;
  public Precio = 0;
  public TasaIva: number;
  public TasaIeps: number;
  public TasaDesc: number;

  public get Total(): number {
    return this.Precio * this.Cantidad;
  }

  public get Iva(): number {
    return this.Total * this.TasaIva;
  }

  public get Ieps(): number {
    return this.Total * this.TasaIeps;
  }

  public get Descuento(): number {
    return this.Total * this.TasaDesc;
  }

  public get TotalNeto(): number {
    return ((this.Total - this.Descuento) + (this.Iva + this.Ieps));
  }
}
