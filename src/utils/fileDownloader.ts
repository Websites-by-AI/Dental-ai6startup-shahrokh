/**
 * Utility to trigger instant browser downloads for CAD DXF, STEP 3D Specs, Gerber PCBs, BOM CSVs, and Source Code
 */

export function downloadTextFile(filename: string, content: string, contentType: string = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const CAD_DXF_TEMPLATES = {
  thermoformer: `0
SECTION
2
HEADER
9
$ACADVER
1
AC1009
0
ENDSEC
0
SECTION
2
ENTITIES
0
CIRCLE
8
HOOD_OUTER
10
0.0
20
0.0
30
0.0
40
80.0
0
CIRCLE
8
HEATER_CUTOUT
10
0.0
20
0.0
30
0.0
40
40.0
0
RECTANGLE
8
BASE_CHASSIS
10
-120.0
20
-130.0
10
120.0
20
130.0
0
ENDSEC
0
EOF`,
  impressionBox: `0
SECTION
2
ENTITIES
0
POLYLINE
8
PLEXI_BOX_CUT
10
-150.0
20
-150.0
10
150.0
20
150.0
0
CIRCLE
8
CAMERA_MOUNT
10
0.0
20
0.0
40
22.5
0
ENDSEC
0
EOF`,
  autoclaveLogger: `0
SECTION
2
ENTITIES
0
POLYLINE
8
ENCLOSURE_DIN
10
-60.0
20
-40.0
10
60.0
20
40.0
0
ENDSEC
0
EOF`,
  shadeCard: `0
SECTION
2
ENTITIES
0
RECTANGLE
8
GRAY_CARD_CUT
10
-42.5
20
-27.5
10
42.5
20
27.5
0
ENDSEC
0
EOF`
};

export const GERBER_PCB_SPEC = `G04 DentLab AI - ESP32 Universal Auxiliary Dental Board PCB Gerber Specification*
%FSLAX24Y24*%
%MOIN*%
G04 Layer: Top Copper & Silk Screen*
M02*`;

export const BOMS_CSV = {
  thermoformer: `Reference,Component Name,Specification,Tehran Supplier,Price (IRR),Amazon Price (USD)
U1,ESP32 WROOM 32D,30-pin Dual-Core 240MHz,Amjad - Aftab Rayaneh,210000,4.50
S1,MLX90614ESF-BCC,IR Temp Sensor 35 deg FOV,Amjad - Nadco,160000,12.90
SSR1,FoTek SSR-40DA,40A 240V AC Zero-Cross,Lalehzar - Abbasi,140000,8.50
M1,Vacuum Motor 1200W,Bucket Vacuum Motor AC,Imam Khomeini Square,850000,45.00
H1,IR Ceramic Element 1000W,1000W Radiant Curved,Lalehzar Electric,180000,18.00
C1,Acrylic & Chassis Frame,Laser cut 5mm acrylic & steel,Pamenar Laser,1200000,65.00
Sheet,PETG Dental Sheets 1.0mm,High Transparency Ortho 100pk,Pamenar Plastic,25000,0.85`,
  impressionScanner: `Reference,Component Name,Specification,Tehran Supplier,Price (IRR),Amazon Price (USD)
Box1,Plexi Lightbox 30x30cm,Frosted Acrylic 5mm,Pamenar Laser,280000,25.00
LED1,SMD 5630 LED Strip,CRI>95 High Color Accuracy,Amjad Lighting,95000,8.00
Cam1,USB Macro HD Camera,1080p 60fps Auto-Focus,Charsou Market,120000,18.00
Card1,18% Graycard Calibrator,Matte Photo Synthetic,Pamenar Graphic,15000,2.00`,
  autoclaveLogger: `Reference,Component Name,Specification,Tehran Supplier,Price (IRR),Amazon Price (USD)
TC1,MAX6675 Thermocouple K,High Temp Stainless Probe,Amjad - Nadco,220000,7.50
P1,TTL Thermal Sticker Printer,2 inch Micro Label Printer,Amjad / Abbasi,1450000,68.00
U1,ESP32 + RTC DS3231,Time-stamped logger board,Amjad,280000,6.20`,
  shadeMatcher: `Reference,Component Name,Specification,Tehran Supplier,Price (IRR),Amazon Price (USD)
App1,Python SaaS Engine,OpenCV LAB Delta-E Algorithm,In-house Software,10000000,29.00/mo
Card1,Synthetic Gray Card 18%,Standard Reference Card,Pamenar Graphic,15000,1.50`
};
