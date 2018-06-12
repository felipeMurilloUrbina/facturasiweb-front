import { Complemento } from './complemento.model';
import { DetalleCotizacion } from './detalle-cotizacion.model';
export class Cotizacion {
  public Id = 0;
  public Serie: string;
  public Folio: string;
  public Observacion: string;
  public UsoCFDIId = 0;
  public FormatoId = 0;
  public ClienteId = 0;
  public SucursalId = 0;
  public MetodoPagoId = 0;
  public FormaPagoId = 0;
  public NoCuentaPago: string;
  public PagoEn: string;
  public EsCredito = false;
  public EsGlobal = false;
  public RegimenId= 0;
  public Cliente: any;
  public Sucursal: any;
  public MetodoPago: any;
  public FormaPago: any;
  public Regimen: any;
  public Archivos: any[];
  public Detalles: DetalleCotizacion[] = [];
  public Complementos: Complemento[] = [];
  constructor() {
  }

  public get SubtotalE(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.SubtotalE).reduce((sum, current) => sum + current);
  }

  public get SubtotalG(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.SubtotalG).reduce((sum, current) => sum + current);
  }

  public get Descuento(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.DescuentoDinero).reduce((sum, current) => sum + current);
  }

  public get Importe(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Importe).reduce((sum, current) => sum + current);
  }

  public get Iva(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Iva).reduce((sum, current) => sum + current);
  }

  public get Ieps(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Ieps).reduce((sum, current) => sum + current);
  }

  public get RetIva(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.RetIva).reduce((sum, current) => sum + current);
  }

  public get RetIsr(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.RetIsr).reduce((sum, current) => sum + current);
  }

  public get Total(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Total).reduce((sum, current) => sum + current);
  }
}
