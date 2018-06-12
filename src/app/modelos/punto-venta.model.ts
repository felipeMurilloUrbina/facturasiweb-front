import { PuntoVentaDetalle } from "./punto-venta-detalle.model";

export class PuntoVenta {
  public Id: number;
  public TurnoId: number;
  public CajaId: number;
  public SucursalId: number;
  public UsuarioId: number;
  public ClienteId: number;
  public TipoVentaId: number;
  public Folio: number;
  public Serie: string;
  public DineroEnTarjeta = 0;
  public DineroEnVales =  0;
  public DineroEnEfectivo = 0;
  public DineroEnCupones = 0;
  public Detalles: PuntoVentaDetalle[]  = [];

  public get Descuento(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Descuento).reduce((sum, current) => sum + current);
  }

  public get SubtotalG(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Descuento).reduce((sum, current) => sum + current);
  }
  public get SubtotalE(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Descuento).reduce((sum, current) => sum + current);
  }
  public get Importe(): number {
    return this.SubtotalE + this.SubtotalG;
  }

  public get Iva(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Iva).reduce((sum, current) => sum + current);
  }

  public get Ieps(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Ieps).reduce((sum, current) => sum + current);
  }

  public get Total(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.Total).reduce((sum, current) => sum + current);
  }

  public get Cambio(): number {
    return (this.DineroEnCupones + this.DineroEnEfectivo + this.DineroEnTarjeta + this.DineroEnVales) - this.Total;
  }
}
