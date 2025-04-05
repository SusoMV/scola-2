
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ScolaLogo from '@/components/ScolaLogo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/integrations/supabase/types';

// Define a specific type for the school data we need
type SchoolBasic = Pick<Tables<'schools'>, 'id' | 'name'>;

// Lista de centros educativos
const SCHOOLS = [
  '15000016 - CEIP San Marcos',
  '15026637 - CEIP de Barouta',
  '15025220 - CEP Plurilingüe  de Ventín',
  '15032649 - EEI de Milladorio',
  '15020659 - EEI de Covas',
  '15000107 - CEIP A Maía',
  '15032625 - CEIP Agro do Muíño',
  '15019542 - EEI da Igrexa',
  '15021779 - CEIP da Castellana',
  '15000338 - CPI As Mirandas',
  '15020672 - EEI de Rorís',
  '15032716 - CEIP de Arteixo',
  '15000363 - CEIP Ponte dos Brozos',
  '15020714 - EEI de Larín de Arriba',
  '15023041 - CEIP de Galán',
  '15032376 - EEI de Vilarrodís-Oseiro',
  '15000569 - CEIP San Xosé Obreiro',
  '15020933 - EEI de Barrionovo',
  '15020775 - EEI da Lagoa',
  '15000612 - CEIP de Arzúa',
  '15019301 - CPI de San Vicente',
  '15001070 - CPI de Cruz do Sar',
  '15001124 - CEIP Francisco Vales Villamarín',
  '15001239 - CPI Armando Cotarelo Valledor',
  '15001367 - CEIP Plurilingüe de Abanqueiro',
  '15022085 - CEIP de Pazos-Comoxo',
  '15001471 - CEIP Praia Xardín',
  '15021500 - CEIP Santa Baia',
  '15023341 - CEIP Santa María do Castro',
  '15027149 - CEIP de Cespón',
  '15001616 - CEIP de Escarabote',
  '15001665 - CPI Plurilingüe Antonio Orza Couto',
  '15001811 - EEI de Sabaxáns',
  '15001847 - CEIP  Plurilingüe de Pedrouzos',
  '15001744 - EEI dos Ánxeles',
  '15001926 - CPI As Revoltas',
  '15002025 - CEIP Eladia Mariño',
  '15002086 - CEIP de Ponte do Porto',
  '15002050 - CEIP O Areal',
  '15002062 - CEIP de Camelle',
  '15025554 - CEIP Emilio González López',
  '15002165 - CEIP Wenceslao Fernández Flórez',
  '15032426 - CEIP Plurilingüe O Graxal',
  '15023053 - CEIP Portofaro',
  '15019608 - EEI de San Bartolomeu',
  '15023065 - CEIP Gonzalo Torrente Ballester',
  '15020969 - CEIP Plurilingüe Mosteiro de Caaveiro',
  '15021524 - CEIP Plurilingüe A Cristina',
  '15021354 - CEIP Bergantiños',
  '15002578 - CEIP Fogar',
  '15027393 - CEIP Xesús San Luís Romero',
  '15024896 - CEIP de Nétoma-Razo',
  '15023077 - CEIP de Gándara-Sofán',
  '15011661 - CEIP Manuel Fraga Iribarne',
  '15002852 - CEIP do Pindo',
  '15002761 - CEIP Plurilingüe de Carnota',
  '15003005 - CEIP Vicente Otero Valcárcel',
  '15003017 - CEIP de Tabeaio',
  '15003054 - CEIP Nicolás del Río',
  '15022139 - EEI da Pereiriña',
  '15022127 - CEIP da Igrexa',
  '15003248 - CEIP Plurilingüe Vila de Cee',
  '15003376 - CPI Plurilingüe O Cruce',
  '15020970 - CEIP Plurilingüe Celso Emilio Ferreiro',
  '15003534 - CEIP da Barqueira',
  '15022152 - EEI de Coirós de Arriba',
  '15003789 - CEIP Praia de Quenxe',
  '15003807 - CEIP de Bormoio- Agualada',
  '15002670 - CEIP Canosa-Rus',
  '15003881 - CPI Alcalde Xosé Pichel',
  '15019323 - CEIP Plurilingüe Alborada',
  '15004976 - CEIP Curros Enríquez',
  '15005038 - CEIP de Prácticas',
  '15021721 - CEIP de Zalaeta',
  '15021627 - CEIP Emilia Pardo Bazán',
  '15004988 - CEIP Eusebio da Guarda',
  '15023375 - CEIP José Cornide Saavedra',
  '15027241 - CEIP Juan Fernández Latorre',
  '15020568 - CEIP Plurilingüe Labaca',
  '15019311 - CEIP Plurilingüe María Barbeito e Cervino',
  '15005518 - CEIP María Pita',
  '15004991 - CEIP Cidade Vella',
  '15033228 - CEIP Novo Mesoiro',
  '15004745 - CEIP Plurilingüe Anxo da Garda',
  '15004964 - CEIP Plurilingüe Concepción Arenal',
  '15005521 - CEIP Ramón de la Sagra',
  '15005014 - CEIP Raquel Camacho',
  '15005361 - CEIP Rosalía de Castro',
  '15025037 - CEIP Sagrada Familia',
  '15021548 - CEIP Sal Lence',
  '15021792 - CEIP Salgado Torres',
  '15025025 - CEIP San Francisco Javier',
  '15005701 - CEIP Plurilingüe San Pedro de Visma',
  '15005026 - CEIP Torre de Hércules',
  '15021536 - CEIP Plurilingüe Víctor López Seoane',
  '15024902 - CEIP Plurilingüe Wenceslao Fernández Flórez',
  '15023363 - CEIP Plurilingüe  Manuel Murguía',
  '15027253 - CEIP Isaac Díaz Pardo',
  '15005828 - CEIP Plurilingüe de Tarrío',
  '15027708 - CEIP Plurilingüe Ría do Burgo',
  '15021809 - CEIP Sofía Casanova',
  '15033149 - CEIP Vila de Rutis',
  '15005877 - CEIP de Teixeiro',
  '15005932 - CEIP de Curtis',
  '15023399 - CPI Eusebio Lorenzo Baleirón',
  '15021810 - CEIP Plurilingüe Santa Eulalia de Dumbría',
  '15020982 - CEIP Plurilingüe O Ramo',
  '15025633 - CEIP Plurilingüe Os Casais',
  '15022981 - CEIP Plurilingüe de Centieiras',
  '15023405 - CPI A Xunqueira',
  '15024941 - CEIP Plurilingüe A Laxe',
  '15021858 - CEIP Almirante Juan de Lángara y Huarte',
  '15006663 - CEIP Cruceiro de Canido',
  '15024938 - CEIP de Esteiro',
  '15026960 - CEIP de Ponzos',
  '15006845 - CEIP Isaac Peral',
  '15021834 - CEIP Manuel Masdías',
  '15006699 - CEIP Plurilingüe Ángela Ruiz Robles',
  '15021846 - CEIP  Plurilingüe San Xoán de Filgueira',
  '15024227 - CEIP de Pazos',
  '15007242 - CEIP Mar de Fóra',
  '15007266 - CEIP Areouta',
  '15007400 - CPI de Ponte Carreira',
  '15007655 - CEIP de Caión',
  '15025256 - CEIP Alfredo Brañas',
  '15007886 - CEIP Ramón Otero Pedrayo',
  '15007621 - CPI Plurilingüe Cabo da Area',
  '15021160 - EEI de Traba',
  '15008039 - CPI Plurilingüe Cernadas de Castro',
  '15021861 - CEIP Joaquín Rodríguez Otero',
  '15026765 - CEIP Milladoiro',
  '15008398 - CEIP Francisco López Estrada',
  '15008490 - CEIP Víctor Sáenz',
  '15008714 - CPI Plurilingüe da Picota',
  '15008805 - CEIP de Melide Nº 1',
  '15023910 - CEIP Martagona',
  '15027526 - CEIP Mestre Pastor Barral',
  '15008982 - EEI de Olas',
  '15009007 - EEI Visantoña',
  '15020854 - CPI de Xanceda',
  '15023223 - CEIP de Bemantes',
  '15009071 - CPI Castro Baxoi',
  '15009081 - CEIP de San Ramón',
  '15009241 - CPI Plurilingüe Virxe da Cela',
  '15009391 - CEIP Santiago Apóstolo',
  '15009445 - CEIP Plurilingüe Unión Mugardesa',
  '15009810 - CEIP Plurilingüe Ricardo Tobío',
  '15024951 - CEIP  Plurilingüe de Louro',
  '15023727 - EEI de Muros',
  '15009998 - CEIP Ramón de Artaza y Malvárez',
  '15021214 - EEI de Tal de Abaixo',
  '15009597 - CEIP de Vilarmide- Eduardo Noya',
  '15024239 - CEIP dos Muíños',
  '15009676 - CEIP Virxe da Barca',
  '15019499 - CEIP de Piñeiros',
  '15023508 - CEIP Plurilingüe Virxe do Mar',
  '15022310 - CEIP A Gándara',
  '15023740 - CEIP A Solaina',
  '15010162 - CEIP Plurilingüe  Ponte de Xubia',
  '15010058 - CPI do Feal',
  '15022577 - CEIP de Maciñeira',
  '15010307 - CEIP San Isidro',
  '15022826 - EEI de Aro',
  '15010575 - CEIP O Coto',
  '15010681 - CEIP Plurilingüe Alexandre Rodríguez Cadarso',
  '15010848 - CEIP Felipe de Castro',
  '15025670 - CEIP Plurilingüe Isidro Parga Pondal',
  '15023089 - CEIP Luís Seoane',
  '15011026 - CEIP Plurilingüe de Rabadeira',
  '15025050 - CEIP Ramón María del Valle- Inclán',
  '15011105 - CEIP de Mesón do Vento',
  '15011336 - CEIP Alfonso D. Rodríguez Castelao',
  '15025487 - CEIP Campomaior',
  '15032868 - CEIP Plurilíngue do Camiño Inglés',
  '15011567 - CEIP Plurilingüe de Sigüeiro',
  '15011981 - CEIP José María Lage',
  '15033101 - CEIP Plurilingüe de Outes',
  '15021780 - CEIP Plurilingüe Bragade',
  '15012420 - CEIP de Oza dos Ríos',
  '15024045 - EEI de Areas',
  '15021603 - EEI de Viñas',
  '15022322 - EEI da Escravitude',
  '15021056 - EEI de Arretén',
  '15012626 - EEI de Pontecesures',
  '15012742 - CEIP Flavia',
  '15012717 - CEIP Rosalía de Castro',
  '15020374 - EEI de Extramundi de Arriba',
  '15019347 - CPI Camiño de Santiago',
  '15020611 - EEI Gonzar',
  '15013072 - EEI da Granxa',
  '15013059 - EEI de Vilariño',
  '15013199 - CEP Salustiano Rey Eiras',
  '15013163 - EEI Fernández Varela',
  '15023417 - CEP Pilar Maestu Sierra',
  '15026236 - EEI da Angustia',
  '15013230 - CEIP As Forcadas',
  '15013291 - CEIP Eduardo Pondal',
  '15024963 - CEIP Plurilingüe de Andrade',
  '15013412 - CEIP de Ombre',
  '15013503 - CEIP Couceiro Freijomil',
  '15026194 - CEIP Plurilingüe A Fraga',
  '15013643 - CEIP Plurilingüe A Magdalena',
  '15013591 - CEIP Plurilingüe Santa María',
  '15013761 - CEIP de Campanario',
  '15013783 - EEI de Caamaño',
  '15025062 - CEIP de Portosín',
  '15013928 - CEIP Plurilingüe de Sobrado- Nebra',
  '15013977 - CEIP Santa Irene',
  '15013989 - EEI de Queiruga',
  '15013898 - CEIP de Seráns',
  '15024756 - EEI de Carballosa',
  '15025542 - CEIP Xuño',
  '15027401 - CEIP Ana María Diéguez',
  '15014180 - CEIP Alfonso D. Rodríguez Castelao',
  '15023430 - CEP Xosé María Brea Segade',
  '15014261 - CEIP Heroínas de Sálvora',
  '15014271 - CEIP Plurilingüe de Artes',
  '15021731 - CEIP Plurilingüe de Frións',
  '15024771 - CEP Plurilingüe de Carreira',
  '15014295 - EEI Capela-Carreira',
  '15025281 - CEIP de Olveira',
  '15014465 - CEIP Plurilingüe de Palmeira',
  '15014571 - EEI Deán Grande',
  '15014544 - CEIP Plurilingüe O Grupo',
  '15014738 - CPI Plurilingüe dos Dices',
  '15014799 - CEIP de Pumar-Urdilde',
  '15014829 - CEIP Pedro Barrié de la Maza',
  '15032686 - CEIP Plurilingüe O Mosteirón',
  '15014881 - CEIP Sada y sus contornos',
  '15014957 - CPI de San Sadurniño',
  '15015238 - CEIP Plurilingüe Barrié de la Maza',
  '15026777 - CEIP Plurilingüe Pepe de Xan Baña',
  '15016085 - CEIP Arquitecto Casas Novoa',
  '15016221 - EEI do Rial',
  '15016267 - EEI Bispo Teodomiro',
  '15024112 - EEI do Gaioso',
  '15016292 - CEIP Mestre Rodríguez Xixirei',
  '15015652 - CEIP Apóstolo Santiago',
  '15027332 - CEIP das Fontiñas',
  '15015676 - CEIP de Prácticas López Ferreiro',
  '15021883 - CEIP de Vite I',
  '15022589 - CEIP Lamas de Abade',
  '15019359 - CEIP Plurilingüe Monte dos Postes',
  '15024975 - CEIP Pío XII',
  '15016012 - CEIP Plurilingüe Cardeal Quiroga Palacios',
  '15015688 - CEIP Raíña Fabiola',
  '15015998 - CEIP Ramón Cabanillas',
  '15022590 - CEIP de Roxos',
  '15016450 - CEIP de Arcediago',
  '15016784 - CEIP Plurilingüe Virxe do Portal',
  '15025074 - CEIP O Marbán',
  '15017041 - CEIP A Igrexa-Calo',
  '15017107 - CEIP da Ramallosa',
  '15025724 - CEIP Plurilingüe Os Tilos',
  '15017314 - CEIP Plurilingüe de Toques',
  '15021317 - CPI Pecalama',
  '15017880 - CPI Plurilingüe de Fonte- Díaz',
  '15020994 - CPI de Viaño Pequeno',
  '15018203 - CPI de Bembibre',
  '15018343 - CEIP Plurilingüe Xacinto Amigo Lera',
  '15018148 - CPI de Atios',
  '15018471 - CEIP Ortigueira',
  '15020911 - CPI Plurilingüe de Vedra',
  '15018801 - CEIP de Torres',
  '15020921 - CEIP de Présaras',
  '15026789 - CEIP Baíñas',
  '15018938 - EEI de Carantoña',
  '15018987 - CEIP de Castromil',
  '15019372 - CEIP Plurilingüe San Vicenzo',
  '15019086 - CEIP Labarta Pose',
  '15019281 - CPI de Zas',
  '27000010 - CEIP Aquilino Iglesia Alvariño',
  '27013922 - CEIP do Castro de Ouro',
  '27000198 - CEIP Plurilingüe de Antas de Ulla',
  '27000319 - CEIP Plurilingüe Concepción López Rey',
  '27007958 - CPI Luís Díaz Moreno',
  '27016224 - CEIP de San Cosme',
  '27000541 - CEIP San Miguel de Reinante',
  '27000629 - CEIP San Xoán',
  '27000897 - CEIP Virxe do Corpiño',
  '27001087 - CEIP Rosalía de Castro',
  '27002584 - CEIP Plruilingüe Virxe do Carme',
  '27015751 - CEIP Plurilingüe Vista Alegre',
  '27001440 - CEIP Xosé Luís Taboada',
  '27001609 - CEIP Ramón Falcón',
  '27001816 - CEIP Veleiro-Docampo',
  '27002249 - CPI de Castroverde',
  '27002353 - CPI de Cervantes',
  '27015301 - CEIP de Cervo',
  '27020859 - CEIP Península da Paz',
  '27013697 - CEIP Plurilingüe Eloísa Rivadulla',
  '27003126 - CEIP Xoán de Requeixo',
  '27014847 - CEIP Plurilingüe  do Corgo',
  '27002997 - CPI Plurilingüe Virxe do Monte',
  '27016388 - CEIP de Muimenta',
  '27003655 - CPI Poeta Uxío Novoneyra',
  '27003850 - CEIP Plurilingüe Santa María',
  '27004428 - CEIP Plurilingüe de Foz n° 1',
  '27016391 - CEIP O Cantel',
  '27004519 - CEIP Fondo Nois',
  '27004635 - CPI Dr. López Suárez',
  '27005020 - CEIP Plurilingüe  Lagostelle',
  '27005056 - CEIP Plurilingüe Santo Estevo de Parga',
  '27014008 - CPI Plurilingüe Tino Grandío',
  '27005263 - CEIP Plurilingüe de Lousada',
  '27005469 - CEIP Ricardo Gasset',
  '27005913 - CPI Ramón Piñeiro',
  '27006000 - CEIP Juan Rey',
  '27006383 - CEIP A Ponte',
  '27006164 - CEIP Albeiros',
  '27006371 - CEIP Anexa',
  '27006395 - CEIP Benigno Quiroga Ballesteros',
  '27006334 - CEIP das Mercedes',
  '27013673 - CEIP de Casás',
  '27016728 - CEIP Illa Verde',
  '27014665 - CEIP Luís Pimentel',
  '27016467 - CEIP Menéndez y Pelayo',
  '27014793 - CEIP Paradai',
  '27006449 - CEIP Rosalía de Castro',
  '27006401 - CEIP Sagrado Corazón',
  '27006292 - CEIP As Gándaras',
  '27014033 - EEI Fingoi n° 2',
  '27006048 - CEIP Manuel Mallo Mallo',
  '27006735 - CEIP Plurilingüe Poeta Avelino Díaz',
  '27006954 - CEIP Álvaro Cunqueiro Mora',
  '27014860 - CEIP Plurilingüe  A Gándara',
  '27016662 - CEIP Plurilingüe de Monforte de Lemos',
  '27020801 - CEIP de Monterroso',
  '27015876 - CEIP Antía Cal Vázquez',
  '27007788 - CPI Plurilingüe de Navia de Suarna',
  '27008148 - CEIP das Nogais',
  '27008513 - CEIP Laverde Ruiz',
  '27014070 - CEIP de Palas de Rei',
  '27009050 - CEIP Plurilingüe Monte Baliño',
  '27009347 - CEIP Plurilingüe San Miguel',
  '27016492 - CEIP Plurilingüe do Páramo',
  '27009463 - CEIP de Bretoña',
  '27009608 - CEIP O Salvador',
  '27015967 - CPI Uxío Novoneira',
  '27010155 - CEIP da Pobra de Brollón',
  '27010064 - CEIP Plurilingüe Rosalía de Castro',
  '27010325 - CEIP Plurilingüe da Pontenova',
  '27010520 - CEIP Plurilingüe Virxe da Luz',
  '27013703 - CEIP de Quiroga',
  '27011639 - CEIP Otero Pedrayo',
  '27010891 - CEIP Gregorio Sanz',
  '27011032 - CEIP de San Clodio',
  '27011287 - CEIP Plurilingüe de Riotorto',
  '27014240 - CEIP de Samos',
  '27011743 - CEIP Antonio Fernández López',
  '27012012 - CEIP Frei Luís de Granada',
  '27014082 - EEI Xela Arias',
  '27015785 - CEIP de Currelos',
  '27012450 - CPI Dr. López Suárez',
  '27012474 - CEIP Plurilingüe Virxe do Carme',
  '27012504 - CPI San Tomé do Carballo',
  '270610500 - CEIP Plurilingüe Celso Currás',
  '27015979 - CEIP Eduardo Cela Vila',
  '27012826 - CEIP Plurilingüe Santa María do Valadouro',
  '27012887 - CEIP do Vicedo',
  '27015724 - CEIP Monseivane',
  '27015827 - CEIP Terra Chá',
  '27013338 - CEIP Antonio Insua Bermúdez',
  '27013296 - CEIP Manuel Mato Vizoso',
  '27014094 - EEI de Vilalba',
  '27013387 - CEIP de Celeiro',
  '27016406 - CEIP Plurilingüe de Covas',
  '27016170 - CEIP Plurilingüe Santa Rita',
  '27016674 - CEP Luís Tobío',
  '27014100 - EEI San Roque',
  '27014859 - CEIP Plurilingüe de Xermade',
  '27005691 - CEIP Plurilingüe  Pedro Caselles Rollán',
  '32000058 - CEIP Padre Feijoo',
  '32000356 - CEIP Plurilingüe Ramón Otero Pedrayo',
  '32015891 - CEIP San Salvador',
  '32000708 - CEIP Virxe de Guadalupe',
  '32016236 - CEIP de Baltar',
  '32001002 - CEIP Xoaquín Lourenzo Xocas',
  '32001312 - CEIP de Baños de Molgas',
  '32016789 - CEIP Filomena Dato',
  '32020781 - CEIP Plurilingüe O Ruxidoiro',
  '32015116 - CEIP Plurilingüe Condesa de Fenosa',
  '32001658 - CEIP Plurilingüe Julio Gurriarán Canalejas',
  '32001671 - CEIP Ramón Otero Pedrayo',
  '32001920 - CEIP de Beariz',
  '32002043 - CEIP Plurilingüe dos Blancos',
  '32002122 - CEIP Nosa Señora de Xuvencos',
  '32015098 - CEIP do Bolo',
  '32015906 - CEIP Pena Corneira',
  '32002781 - CPI Tomás Terrón Mendaña',
  '32015025 - CEIP de Casaio',
  '32002951 - CEIP Plurilingüe Calvo Sotelo',
  '32003059 - CEIP San Marcos'
];

// Lista de especialidades
const SPECIALTIES = [
  '597031 Infantil',
  '597032 Inglés',
  '597033 Francés',
  '597034 Educación Física',
  '597036 Pedagoxía Terapéutica',
  '597035 Música',
  '597037 Audición e Linguaxe',
  '597038 Primaria',
  '597939 Orientación'
];

// Roles que un usuario puede tener
const ROLES = [
  'docente',
  'alumnado',
  'directivo'
];

// Define the form schema using Zod
const registerSchema = z.object({
  email: z.string().email('O correo electrónico é obrigatorio'),
  password: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  confirmPassword: z.string(),
  full_name: z.string().min(3, 'O nome completo é obrigatorio'),
  phone: z.string().min(9, 'O teléfono é obrigatorio'),
  role: z.string({
    required_error: 'Selecciona un rol',
  }),
  specialty: z.string().optional(),
  school_code: z.string({
    required_error: 'Selecciona un centro educativo',
  }),
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Os contrasinais non coinciden',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Use React Hook Form with Zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      full_name: '',
      phone: '',
      role: 'docente',
      specialty: '',
      school_code: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      // Extract school name from the selected code
      const schoolSelection = values.school_code;
      const schoolName = schoolSelection.split(' - ')[1] || schoolSelection;
      
      // Prepare user metadata
      const userData = {
        full_name: values.full_name,
        phone: values.phone,
        role: values.role,
        specialty: values.specialty || null,
        school_code: values.school_code.split(' - ')[0] || null,
        school_name: schoolName
      };
      
      // Register the user
      await signUp(values.email, values.password, userData);
      
      // Navigate to login after successful registration
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setServerError(error.message || 'Houbo un erro ao rexistrarse. Téntao de novo máis tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchRole = form.watch('role');
  const showSpecialty = watchRole === 'docente';

  return (
    <Card className="w-full max-w-md shadow-md border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <ScolaLogo size="lg" />
        </div>
        <CardTitle className="text-xl text-center text-scola-primary">Crear conta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="nome@exemplo.gal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrasinal</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Contrasinal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contrasinal</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirmar contrasinal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome e apelidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono de contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona o teu rol no centro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {showSpecialty && (
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona a túa especialidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SPECIALTIES.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="school_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro educativo</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona o teu centro educativo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SCHOOLS.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {serverError && (
              <div className="text-destructive text-sm font-medium">{serverError}</div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-scola-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Rexistrando...' : 'Crear conta'}
            </Button>
            
            <div className="text-center text-sm mt-4">
              <span className="text-muted-foreground">Xa tes unha conta?</span>
              <Link to="/login" className="text-scola-primary hover:underline ml-1 font-medium">
                Inicia sesión
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
