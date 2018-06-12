export class FactDetalle {
  public FacturaId = 0;
  public CatalogoId: string;
  public CodigoSat: string;
  public CuentaPredial: string;
  public CatSatUnidad: any;
  public CatSatProducto: any;
  public Codigo: string;
  public Descripcion: string;
  public Lote: string;
  public FechaCaducidad: string;
  public UnidadId = 0;
  public TasaRetIva = 0;
  public TasaRetIsr = 0;
  public TasaIva = 0;
  public TasaIeps = 0;
  public TasaRetIvaMostrar = 0;
  public TasaRetIsrMostrar = 0;
  public TasaIvaMostrar = 0;
  public TasaIepsMostrar = 0;
  public Precio = 0;
  public Cantidad = 0;
  public TasaDesc = 0;
  public TipoComplemento: string;
  public Complemento: string;
  constructor() {
  }

  public get ImporteSinDescuento(): number {
    return  (this.Cantidad * this.Precio);
  }
  public get DescuentoDinero(): number {
    return  (this.ImporteSinDescuento * (this.TasaDesc / 100));
  }

  public get ImporteMenosDescuento(): number {
    return  (this.ImporteSinDescuento - this.DescuentoDinero);
  }

  public get SubtotalE(): number {
    return this.TasaIva === 0 ? this.ImporteMenosDescuento : 0;
  }

  public get SubtotalG(): number {
    return this.TasaIva === 0 ? 0 :  this.ImporteMenosDescuento;
  }

  public get Importe (): number {
    return this.SubtotalE + this.SubtotalG;
  }

  public get Iva (): number {
    return this.Importe * this.TasaIva;
  }

  public get Ieps (): number {
    return this.Importe * this.TasaIeps;
  }

  public get RetIva (): number {
    return this.Importe * this.TasaRetIva;
  }

  public get RetIsr (): number {
    return this.Importe * this.TasaRetIsr;
  }

  public get Total (): number {
    return (this.Importe  - (this.RetIva + this.RetIsr)) + this.Iva + this.Ieps;
  }
}
