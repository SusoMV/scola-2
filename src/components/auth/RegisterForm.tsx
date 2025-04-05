
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
  '32003059 - CEIP San Marcos',
  '32003503 - CEIP de Castrelo de Miño',
  '32015682 - CEIP Plurilingüe de Castrelo do Val',
  '32003643 - CPI Virxe dos Remedios',
  '32003771 - CEIP Plurilingüe Curros Enríquez',
  '32015918 - CEIP Carmen García Carrasco',
  '32004118 - CPI Antonio Faílde',
  '32015268 - CEIP Plurilingüe Otero Novas',
  '32004398 - CEIP Vicente Risco',
  '32014902 - CEIP Santa María A Real',
  '32005305 - CPI Laureano Prieto',
  '32005408 - CEIP Virxe da Pena da Sela',
  '32015165 - CEIP O Castiñeiro',
  '32006000 - CEIP Emilia Pardo Bazán',
  '32006358 - CEIP  Plurilingüe  do Xurés',
  '32006553 - CEIP de Maceda',
  '32006747 - CEIP de Manzaneda',
  '32006929 - CPI Terras de Maside',
  '32016261 - CEIP de Quins',
  '32015189 - CEIP Joaquina Gallego Jorreto',
  '32007272 - CEIP Augusto Assía',
  '32015657 - CEIP de Medeiros',
  '32007739 - CEIP Valle-Inclán',
  '32008033 - CEIP Plurilingüe de Luíntra',
  '32008173 - CEIP de Oímbra',
  '32016327 - CEIP A Ponte',
  '32015190 - CEIP Plurilingüe Albino Núñez',
  '32008847 - CEIP Plurilingüe Amadeo Rodríguez Barroso',
  '32009165 - CEIP As Mercedes',
  '32008835 - CEIP Curros Enríquez',
  '32008771 - CEIP de Práct. da E.U. Form. Profes. EXB',
  '32008392 - CEIP Plurilingüe  Inmaculada',
  '32008801 - CEIP Plurilingüe Irmáns Villar',
  '32008793 - CEIP Manuel Luís Acuña',
  '32015219 - CEIP Manuel Sueiro',
  '32009153 - CEIP Mariñamansa',
  '32015669 - CEIP Mestre Vide',
  '32008768 - CEIP O Couto',
  '32008811 - CEIP Virxe de Covadonga',
  '32015220 - CEIP Vistahermosa',
  '32009360 - CPI Plurilingüe José García García',
  '32009301 - CEIP Plurilingüe de Seixalbo',
  '32015177 - CPI de Padrenda-Crespos',
  '32016029 - CEIP Plurilingüe Ben-Cho-Shey',
  '32010121 - CEIP Roberto Blanco Torres',
  '32010601 - CEIP Pluriingüe Manuel Bermúdez Couso',
  '32010775 - CEIP de Punxín',
  '32011032 - CEIP Plurilingüe Carlos Cid Arregui',
  '32011135 - CEIP Rogelio García Yáñez',
  '32011305 - CEIP Plurilingüe Ribadavia',
  '32015256 - CEIP das Vendas da Barreira',
  '32011755 - CEIP Manuel Respino',
  '32011901 - CEIP Plurilingüe Virxe do Camiño',
  '32015921 - CEIP Plurilingüe Eulogio Gómez Franqueira',
  '32015396 - EEI de Noalla',
  '32015402 - EEI de Santa Cruz',
  '32012103 - CPI Virxe da Saleta',
  '32016042 - CEIP de Sandiás',
  '32012425 - CEIP de Sarreaus',
  '32015426 - EEI de Taboadela',
  '32012711 - CEIP Saco e Arce',
  '32013168 - CEIP Eduardo Ávila Bustillo',
  '32015797 - CEIP Amaro Refojo',
  '32013521 - CEIP Princesa de España',
  '32013661 - CEIP Bibei',
  '32013958 - CEIP Xosé Manuel Folla Respino',
  '32014151 - CEIP Plurilingüe de Vilar de Barrio',
  '32014501 - CEIP Plurilingüe Rodolfo Núñez Rodríguez',
  '32015141 - CEIP de Vilariño de Conso',
  '32004829 - CEIP Rosalía de Castro',
  '32004830 - CEIP Carlos Casares',
  '32005691 - CEIP Padre Crespo',
  '36003480 - CEIP de Agolada',
  '36000031 - CEIP Antonio Carpintero',
  '36014921 - CEIP de Fontes-Baíña',
  '36000247 - CPI de Cova Terreña',
  '36014362 - EEI de Agro-Baredo',
  '36018963 - CEIP Plurilingüe de Belesar',
  '36000302 - CEP de Sabarís',
  '36014374 - EEI O Areal',
  '36015381 - EEI de Curro',
  '36000181 - CEIP Amor Ruibal',
  '36000326 - CEIP Plurilingüe de Montemogos',
  '36000341 - CEIP Plurilingüe A Pedra',
  '36000375 - CEIP Plurilingüe da Torre-Cela',
  '36000405 - CPI Plurilingüe Alfonso VII',
  '36015861 - CEIP Plurilingüe San Clemente de Cesar',
  '36015093 - CEIP San Tomé',
  '36000478 - CEP Antonio Magariños Pastoriza',
  '36019773 - EEI da Pastora',
  '36000508 - CEIP Plurilingüe  de Castrelo',
  '36016103 - CEIP de Corvillón',
  '36000648 - CEIP Plurilingüe Enrique Barreiro Piñeiro',
  '36018859 - EEI Modia',
  '36000685 - CEIP Pedro Antonio Cerviño',
  '36015950 - CEIP da Espiñeira-Aldán',
  '36000879 - CEIP Nazaret',
  '36018975 - CEIP A Rúa',
  '36000934 - CEIP do Castrillón-Coiro',
  '36001033 - CEIP Plurilingüe San Roque de Darbo',
  '36001057 - CEIP do Hío',
  '36001148 - CPI da Cañiza',
  '36014945 - CEIP de Valeixe',
  '36001240 - EEI de Dimo',
  '36001252 - CPI de Progreso',
  '36001343 - CEIP San Xoán Bautista',
  '36001550 - CEIP Plurilingüe  de Carballedo',
  '36001665 - CEIP de Tenorio',
  '36001690 - CEIP Antonio Blanco Rodríguez',
  '36001707 - CEIP Plurilingüe Manuel Sieiro',
  '36015111 - CPI Aurelio Marcelino Rey García',
  '36001975 - CEIP Pío Cabanillas Gallas',
  '36013618 - CEIP de Figueiroa',
  '36002347 - CEIP Pérez Viondi',
  '36002220 - CEIP Cabada Vázquez',
  '36014854 - CEIP Plurilingüe de Oca',
  '36002773 - CEIP do Foxo',
  '36014866 - CEIP Manuel Villar Paramá',
  '36003170 - CEIP de Soutelo de Montes',
  '36003111 - CEIP Nosa Señora das Dores',
  '36003388 - CEIP Doutor Suárez',
  '36017703 - CEIP Plurilingüe Souto-Donas',
  '36003662 - CEIP Plurilingüe Chano Piñeiro',
  '36018631 - CEP Xosé Neira Vilas',
  '36014672 - CEIP Serra-Vincios',
  '36018100 - CEIP As Bizocas',
  '36014878 - CEIP Plurilingüe de Conmeniño',
  '36003807 - CEIP Rosalía de Castro',
  '36003832 - CEIP Valle-Inclán',
  '36018653 - CEIP Plurilingüe As Solanas- Nicolás Gutiérrez Campo',
  '36003959 - CEIP Manuel Rodríguez Sinde',
  '36015135 - CEIP A Sangriña',
  '36015706 - EEI da Gándara',
  '36013011 - CEIP da Torre-Illa',
  '36014970 - CEIP Plurilingüe Varela Buxán',
  '36013916 - EEI de Donramiro',
  '36004095 - CEIP Manuel Rivero',
  '36004101 - CEIP Xesús Golmar',
  '36004149 - CEIP Xoaquín Loriga',
  '36004174 - CEIP Plurilingüe Vicente Arias de la Maza',
  '36014611 - CEIP A Lama',
  '36004460 - CEIP de Ardán',
  '36004484 - CEIP da Laxe',
  '36004496 - CEP de Sequelo-Marín',
  '36004472 - CEIP do Carballal',
  '36014982 - EEI O Grupo',
  '36004681 - CEIP de Seixo',
  '36004691 - CEIP de Coirón-Dena',
  '36015871 - CEIP Plurilingüe de Meaño-As Covas',
  '36018446 - CEIP da Armenteira',
  '36004708 - CPI de Mosteiro-Meis',
  '36004711 - CEIP Plurilingüe de Domaio',
  '36019438 - CEIP A Guía',
  '36004733 - CEIP Plurilingüe de Reibón',
  '36013552 - CEIP de Seara',
  '36016590 - CEIP de Abelendo',
  '36016607 - CEIP de Quintela',
  '36016796 - EEI de Verducedo',
  '36015378 - CEIP Plurilingüe de Tirán',
  '36016814 - EEI do Con',
  '36004927 - CPI de Mondariz',
  '36005087 - CEIP Nosa Señora de Lourdes',
  '36013540 - EEI de Amil',
  '36013527 - EEI de Lamas',
  '36005142 - CPI Plurilingüe Santa Lucía',
  '36013539 - EEI San Lourenzo de Moraña',
  '36016619 - CEIP de Atín-Cela',
  '36005245 - CEIP Mestre Martínez Alonso',
  '36019441 - CEIP de Petelos',
  '36017648 - CEIP Mestre Valverde Mayo',
  '36013564 - CEIP Plurilingüe Pena de Francia',
  '36005555 - CEIP Marquesa do Pazo da Mercé',
  '36005622 - EEI de Rubiós',
  '36005658 - EEI de Taboexa',
  '36005956 - CEIP Carlos Casares',
  '36018434 - CEIP Mallón',
  '36016620 - CEIP da Cruz',
  '36005774 - CEIP Humberto Juanes',
  '36005865 - CPI Plurilingüe Arquitecto Palacios',
  '36015160 - EEI As Dunas Panxón',
  '36016735 - CEIP de Refoxos',
  '36006067 - CEIP Mestre Manuel García',
  '36014684 - EEI de Outeiro',
  '36006079 - CPI Curros Enríquez',
  '36007060 - CEIP Plurilingüe de Chancelas',
  '36015202 - CEIP de Lourido',
  '36007242 - CEIP de Viñas',
  '36007199 - CEIP Plurilingüe Isidora Riestra',
  '36013710 - EEI do Vao',
  '36015895 - CEIP de Espedregada',
  '36007591 - CEIP Manuel Cordo Boullosa',
  '36015536 - CEIP Plurilingüe A Reigosa',
  '36007370 - CEIP Plurilingüe Feliciano Barrera',
  '36016942 - CEIP de Santiago de Oliveira',
  '36007539 - CEIP Fermín Bouza Brey',
  '36016954 - CEIP Plurilingüe Mestre Ramiro Sabell Mosquera',
  '36007497 - CEIP Nosa Señora dos Remedios',
  '36007621 - CPI de Pontecesures',
  '36006109 - CEIP de Parada-Campañó',
  '36006134 - CEIP San Benito de Lérez',
  '36006316 - CEIP Daría González García',
  '36006195 - CEIP A Carballeira',
  '36019608 - CEIP de Marcón',
  '36006778 - CEIP de Ponte Sampaio',
  '36006122 - CEIP A Xunqueira n° 1',
  '36006377 - CEIP Álvarez Limeses',
  '36006420 - CEP Campolongo',
  '36006353 - CEIP de Vilaverde- Mourente',
  '36006407 - CEIP Plurilingüe Froebel',
  '36006390 - CEIP Manuel Vidal Portela',
  '36017661 - CEIP Plurilingüe Praza de Barcelos',
  '36015172 - CEIP A Xunqueira n° 2',
  '36019611 - CEP Marcos da Portela',
  '36014994 - EEI Concepción Crespo Rivas',
  '36013837 - EEI Fina Casalderrey',
  '36018690 - CEIP de Cabanas',
  '36006833 - CEIP San Martiño',
  '36015500 - EEI de Verducido',
  '36019517 - CEIP Santo André de Xeve',
  '36018422 - CEIP Plurilingüe de Atios',
  '36016929 - CEIP da Cruz-Budiño',
  '36017570 - EEI de Mosende',
  '36007023 - CEIP Xosé Fernández López',
  '36017715 - CEIP Antonio Palacios',
  '36017685 - CEIP da Ribeira',
  '36013311 - EEI de Lantaño',
  '36007035 - CPI Domingo Fontán',
  '36013333 - EEI de Romai',
  '36007631 - CEIP de Porto Cabeiro',
  '36015007 - CEIP de Cedeira',
  '36007643 - CEIP Plurilingüe Outeiro das Penas',
  '36015214 - EEI de San Pedro de Cesantes',
  '36014881 - CEIP Plurilingüe Alexandre Bóveda',
  '36014817 - CEIP da Igrexa-Chapela',
  '36016644 - CEIP de Laredo',
  '36018410 - CEIP Quintela',
  '36007709 - CEIP Plurilingüe de Reboreda',
  '36007710 - CEP Santa Mariña',
  '36014726 - EEI A Marisma',
  '36015548 - EEI de Ventosela',
  '36007813 - CPI Julia Becerra Malvar',
  '36008155 - CPI  Plurilingüe de Rodeiro',
  '36013576 - CPI Manuel Suárez Marquier',
  '36008489 - CEP Altamira',
  '36016966 - CEP Carlos Casares',
  '36014738 - CEIP de Leirado',
  '36008751 - CEIP Infante Felipe de Borbón',
  '36008805 - CEIP de Portonovo',
  '36008829 - CEIP Magaláns-Dorrón',
  '36019104 - CEIP Plurilingüe de Nantes',
  '36015846 - CEIP de Noalla-Telleiro',
  '36017582 - EEI de Aios',
  '36008866 - CEIP A Florida',
  '36008878 - CEIP Plurilingüe Cruceiro',
  '36009032 - CEIP Ramón de Valenzuela',
  '36009135 - CEIP Plurilingüe de Silleda',
  '36009172 - CEIP Manuel Padín Truiteiro',
  '36014763 - EEI de Romariz',
  '36019049 - CEIP de Barrantes',
  '36009411 - CEIP Pintor Antonio Fernández',
  '36015238 - CEIP de Sobrada',
  '36009494 - CEIP Plurilingüe de Tebra',
  '36009524 - CEP Pedro Caselles Beltrán',
  '36016668 - CEP de Caldelas',
  '36014775 - CEIP Plurilingüe de Guillarei',
  '36009755 - CEIP de Pazos de Reis',
  '36015020 - CEIP de Randufe',
  '36018471 - CEIP de Rebordáns',
  '36009846 - CEIP n° 1',
  '36009895 - CEIP Plurilingüe n° 2',
  '36018161 - CEP Xesús Ferro Couselo',
  '36009913 - CEIP de Baño-Xanza',
  '36009949 - CEIP Javier Sensat',
  '36009974 - CEIP de Coutada-Beade',
  '36015032 - CEIP de Chans-Bembrive',
  '36009998 - CEIP de Mosteiro- Bembrive',
  '36010083 - CEIP Plurilingüe Carballal- Cabral',
  '36010101 - CEIP O Sello',
  '36010071 - CEIP Santa Mariña',
  '36010137 - CEIP da Igrexa-Candeán',
  '36010150 - CEIP Mestres Goldar',
  '36010204 - CEIP Párroco Don Camilo',
  '36010228 - CEIP A Paz',
  '36015354 - CEIP Plurilingüe da Carrasqueira',
  '36010484 - CEIP Eduardo Pondal',
  '36010459 - CEIP Josefa Alonso de Alonso',
  '36009962 - CEIP Otero Pedrayo',
  '36010460 - CEIP Alfonso D. Rodríguez Castelao',
  '36010472 - CEIP Plurilingüe  Ría de Vigo',
  '36010587 - CEIP de Sárdoma-Moledo',
  '36010678 - CEIP Paraixal',
  '36010666 - CEIP San Salvador',
  '36015810 - CEIP Sobreira-Valadares',
  '36010691 - CEP Plurilingüe Igrexa- Valadares',
  '36015044 - EEI Monte do Alba',
  '36010162 - CEIP A Canicouva',
  '36016061 - CEIP A Doblada',
  '36015834 - CEIP Altamar',
  '36015068 - CEIP Balaídos',
  '36010125 - CEIP de Fonte Escura',
  '36010708 - CEIP Emilia Pardo Bazán',
  '36017697 - CEIP Escultor Acuña',
  '36015251 - CEIP Frián-Teis',
  '36015627 - CEIP García Barbón',
  '36010241 - CEIP Illas Cíes',
  '36010538 - CEIP Lope de Vega',
  '36015366 - CEIP O Pombal',
  '36018185 - CEIP Pintor Laxeiro',
  '36010721 - CEIP Plurilingüe Ramón y Cajal',
  '36016051 - CEIP Plurilingüe Seis do Nadal',
  '36010423 - CEIP Valle-Inclán',
  '36010629 - CEIP Vicente Risco',
  '36010009 - CEIP Virxe do Rocío',
  '36010711 - CEP Dr. Fleming',
  '36014556 - CEP Santa Tegra-Teis',
  '36015241 - CEP Celso Emilio Ferreiro',
  '36010265 - EEI Cristo da Victoria',
  '36014787 - EEI Monte da Guía',
  '36014325 - EEI Rúa Aragón',
  '36019153 - EEI Rúa Hernán Cortés',
  '36014799 - EEI Vila Laura',
  '36012183 - CEIP Nosa Señora da Piedade',
  '36012377 - CEIP de Cerdeiriñas',
  '36016991 - CEP Plurilingüe de Riomaior',
  '36013588 - CPI do Toural',
  '36018896 - EEI de Vilar-Bamio',
  '36013059 - CEIP de Viñagrande-Deiro',
  '36012584 - CEIP Rosalía de Castro',
  '36017004 - EEI de Guillán',
  '36015263 - CEIP Plurilingüe de Rubiáns',
  '36012742 - CEIP de Vilaxoán',
  '36016565 - EEI de Aralde Sobrán',
  '36012869 - EEI de Solobeira',
  '36019451 - CEIP A Escardia',
  '36012407 - CEIP A Lomba',
  '36012419 - CEIP Arealonga',
  '36015652 - CEIP O Piñeiriño',
  '36012985 - CEIP de Sestelo-Baión',
  '36013023 - CEIP de San Roque',
  '36013096 - CEIP Plurilingüe de San Bartolomé',
  '36015792 - CEIP Xulio Camba',
  '15005385 - CEE María Mariño',
  '15005336 - CEE Nosa Señora do Rosario',
  '15006729 - CEE Terra de Ferrol',
  '15027745 - CEE A Barcia',
  '15027502 - CEE Manuel López Navalón',
  '15032327 - CEE O Pedroso',
  '27014057 - CEE Santa María',
  '27015360 - CEE Infanta Elena',
  '32015529 - CEE O Pino',
  '32015463 - CEE Miño',
  '36024756 - CEE de Panxón',
  '36010733 - CEE Saladino Cortizo',
  '36016772 - CEE de Vilagarcía de Arousa',
  '15032561 - CRA de Bergondo',
  '15032571 - CRA de Boqueixón-Vedra',
  '15032251 - CRA Ponte da Pedra',
  '15033198 - CRA A Tarandeira',
  '15032480 - CRA de Culleredo',
  '15032492 - CRA de Dodro',
  '15026111 - CRA de Narón',
  '15032509 - CRA de Oroso',
  '15027848 - CRA Nosa Señora do Faro',
  '15027551 - CRA de Rianxo',
  '15026169 - CRA de Teo',
  '15026509 - CRA de Valdoviño',
  '32020801 - CRA de Monterrei',
  '32020628 - CRA Amencer',
  '36024938 - CRA Caldas de Reis',
  '36018987 - CRA Antía Cal',
  '36024604 - CRA de Meis',
  '36024069 - CRA A Picaraña',
  '36024616 - CRA de Ribadumia',
  '36024173 - CRA María Zambrano',
  '36024318 - CRA Raíña Aragonta',
  '36024070 - CRA A Lagoa',
  '36024045 - CRA Mestre Manuel Garcés',
  '36024112 - CRA Mestra Clara Torres',
  '36024161 - CRA de Valga',
  '36024495 - CRA de Vilaboa Consuelo González Martínez'
];

const registerSchema = z.object({
  fullName: z.string().min(2, 'O nome debe ter polo menos 2 caracteres'),
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  school: z.string().min(1, 'Selecciona un centro educativo'),
  specialty: z.string().min(1, 'Selecciona unha especialidade'),
  role: z.string().default('docente')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Os contrasinais non coinciden',
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const fetchSchools = async (): Promise<SchoolBasic[]> => {
  const { data, error } = await supabase
    .from('schools')
    .select('id, name');

  if (error) throw error;
  return data || [];
};

const RegisterForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchSchool, setSearchSchool] = useState("");

  const { data: dbSchools = [], isLoading: isLoadingSchools } = useQuery({
    queryKey: ['schools'],
    queryFn: fetchSchools
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      school: '',
      specialty: '',
      role: 'docente'
    }
  });

  // Filtrar escolas baseado na búsqueda
  const filteredSchools = searchSchool.length > 0
    ? SCHOOLS.filter(school => 
        school.toLowerCase().includes(searchSchool.toLowerCase()))
    : SCHOOLS;

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Extract the school name from the value (format: "id - name")
      const schoolParts = data.school.split(' - ');
      const schoolId = schoolParts[0];
      const schoolName = schoolParts.length > 1 ? data.school.substring(schoolId.length + 3) : data.school;
      
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        role: data.role,
        specialty: data.specialty,
        school_id: schoolId,
        school_name: schoolName,
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Erro ao rexistrarse:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const specialties = [
    { id: 'matemáticas', name: 'Matemáticas' },
    { id: 'lingua_galega', name: 'Lingua Galega' },
    { id: 'lingua_castelá', name: 'Lingua Castelá' },
    { id: 'inglés', name: 'Inglés' },
    { id: 'ciencias_naturais', name: 'Ciencias Naturais' },
    { id: 'ciencias_sociais', name: 'Ciencias Sociais' },
    { id: 'educación_física', name: 'Educación Física' },
    { id: 'música', name: 'Música' },
    { id: 'plástica', name: 'Plástica' },
    { id: 'tecnoloxía', name: 'Tecnoloxía' },
    { id: 'informática', name: 'Informática' },
    { id: 'filosofía', name: 'Filosofía' },
    { id: 'latín', name: 'Latín' },
    { id: 'grego', name: 'Grego' },
    { id: 'economía', name: 'Economía' },
    { id: 'física_química', name: 'Física e Química' },
    { id: 'bioloxía_xeoloxía', name: 'Bioloxía e Xeoloxía' },
    { id: 'relixión', name: 'Relixión' },
    { id: 'pedagoxía_terapéutica', name: 'Pedagoxía Terapéutica' },
    { id: 'audición_linguaxe', name: 'Audición e Linguaxe' },
    { id: 'orientación', name: 'Orientación' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-scola-gray py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          <ScolaLogo className="mb-4" />
          <CardTitle className="text-2xl font-bold">Rexístrate</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome e apelidos"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nome@escola.edu"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contrasinal</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          {...field}
                        />
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
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro educativo</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona o teu centro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="p-2">
                          <Input
                            placeholder="Buscar centro por nome ou código"
                            value={searchSchool}
                            onChange={(e) => setSearchSchool(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {filteredSchools.length > 0 ? (
                            filteredSchools.map((school) => (
                              <SelectItem key={school} value={school}>
                                {school}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center text-gray-500">
                              Non se atoparon resultados
                            </div>
                          )}
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona a túa especialidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.id} value={specialty.id}>
                            {specialty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol no centro</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona o teu rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="docente">Docente</SelectItem>
                        <SelectItem value="directivo">Directivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-scola-primary hover:bg-scola-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? 'Creando conta...' : 'Crear conta'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  ¿Xa tes unha conta?{' '}
                  <Link to="/login" className="text-scola-primary hover:underline">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
