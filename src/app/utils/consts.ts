import { environment } from 'environments/environment';
import { EnumTipoPerfil, EnumTipoPlano } from './enums';

export const debug = (...args: any) => {
    if (environment.debug) {
        console.info(...args);
    }
}

export const mapTiposPlanos: { [key: number]: string } = {
    [EnumTipoPlano.Mensal]: 'Plano Mensal',
    [EnumTipoPlano.Semestral]: 'Plano Semestral',
    [EnumTipoPlano.Anual]: 'Plano Anual',
    [EnumTipoPlano.PromocionalAnual]: 'Plano Promocional Anual',
    [EnumTipoPlano.Free]: 'Free (Grátis)'
};

export const mapDescricaoTiposPlanos: { [key: string]: number } = {
    'PlanoMensal': EnumTipoPlano.Mensal,
    'PlanoSemestral': EnumTipoPlano.Semestral,
    'PlanoAnual': EnumTipoPlano.Anual,
    'PlanoPromocionalAnual': EnumTipoPlano.PromocionalAnual,
    'Free': EnumTipoPlano.Free
};

export const mapTiposPerfis: { [key: number]: string } = {
    [EnumTipoPerfil.AdministradorNossoCafofo]: 'Administrador',
    [EnumTipoPerfil.MoradorAdministrador]: 'Morador Adm.',
    [EnumTipoPerfil.Morador]: 'Morador'
};