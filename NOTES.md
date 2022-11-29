# Notes

## Memory Locations

    $0706 - overworld index (0=west hyrule, 1=death mtn/maze island, 2=east hyrule)
    $0707 - "world" (0=caves, enemy encounters...; 1=west hyrule towns; 2=east hyrule towns; 3=palace 1,2,5 ; 4=palace 3,4,6 ; 5=great palace)

    $0709 - involved in returning to the over-world while in side-scroll?

    $0748 - area location index (the index of the spot on the overworld that pulled you into the sideview)
    $0769 - Bank to switch to (other than 0 or 7)

## Registers

All of the below are 1 byte in size

    A  => Accumulator
    X  => X Index Register
    Y  => Y Index Register
    PC => Program Counter
    S  => Stack Pointer
    P  => Status

## Status Flags

All of the following are 1 bit of the P register

    N => Negative
    V => Overflow
    - => Always Set
    B => Break
    D => Decimal
    I => Interrupt Disable
    Z => Zero
    C => Carry

    7654 3210
    NV-B DIZC

## Operations

    AND - And Accumulator and Memory        A & M -> A
    ORA - Or Accumulator and Memory         A | M -> A

    ASL - Arithmetic shift left             C <- 76543210 <- 0 (Multiply by 2?)
    LSR - Logical shift right               0 -> 76543210 -> C (Divide by 2?)
    ROL - Rotate left one bit               C <- 76543210 <- C
    ROR - Rotate right one bit              C -> 76543210 -> C

    JMP - Jump to Location              
    JSR - Jump to Subroutine            
    RTS - Return from Subroutine

    LDA - Load accumulator with memory      M -> A
    LDX - Load value into X register        M -> X
    LDY - Load value into Y register        M -> Y

    STA - Store accumulator in memory       A -> M
    STX - Store X register in memory        X -> M
    STY - Store Y register in memory        Y -> M

    BCC - Branch on carry clear
    BCS - Branch on carry set
    BNE - Branch on result not zero         Branch if Z = 0
    BEQ - Branch on result zero             Branch if Z = 1
    BPL - Branch on result plus             Branch if N = 0
    BMI - Branch on result minus            Branch if N = 1
    BVC - Branch on overflow clear          Branch if V = 0
    BVS - Branch on overflow set            Branch if V = 1

    CMP - Compare accumulator with memory   A - M
    CPX - Compare memory and register X     X - M
    CPY - Compare memory and register Y     Y - M

    INC - Increment memory by 1
    INX - Increment x register by 1
    INY - Increment y register by 1
    DEC - Decrement memory by 1
    DEX - Decrement x register by 1
    DEY - Decrement y register by 1

## Playing with 6502 ASM
    ; Perform a summation of 0 - 10 (non inclusive)
        LDA #$00        ; Reset the accumulator to 0
        LDX #$00        ; Reset the X index to 0
    A   STX $D010       ; Store X into memory location 0xD010
        ADC $D010       ; Add the data at memory location to the accumulator
        INX             ; Increment X
        CPX #$0A        ; Compare X and 0x0A
        BMI A           ; If X < 0x0A, go back to point A

    ; Shift bits until the 1 falls off the left end
        LDA #$01        ; Load the accumulator with 0x1
    A   ASL             ; Shift the bit left
        INX             ; Increment X
        BCC A           ; If carry bit is not set, continue

## Notes for issue with missing exit numbers

    ; Loading probably looks something like this
        STX #$00        ; Initialize X to 0
    A   LDA $XXXX,X     ; Load a byte from $AAAA + X
        STA $YYYY,Y     ; Store a byte to $BBBB + X
        INX             ; Increment X
        CPX #$C         ; Check to see if $C bytes have been read
        BEQ A           ; If not complete, jump back to A

## Code analysis

### Loading overworld map

    A:00 X:00 Y:00 S:F7 P:NvUBdIzc         $8C2D: 20 48 8C  JSR $8C48
    A:00 X:00 Y:00 S:F5 P:NvUBdIzc           $8C48: 0A        ASL
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C49: A8        TAY
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C4A: B9 00 60  LDA $6000,Y @ $6000 = #$00
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C4D: 85 0E     STA $0E = #$FE
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C4F: B9 01 60  LDA $6001,Y @ $6001 = #$7C
    A:7C X:00 Y:00 S:F5 P:nvUBdIzc           $8C52: 85 0F     STA $0F = #$8B
    A:7C X:00 Y:00 S:F5 P:nvUBdIzc           $8C54: A0 00     LDY #$00
    A:7C X:00 Y:00 S:F5 P:nvUBdIZc           $8C56: 60        RTS (from $8C48) ----------------------------
    A:7C X:00 Y:00 S:F7 P:nvUBdIZc         $8C30: 20 01 E0  JSR $E001
    A:7C X:00 Y:00 S:F5 P:nvUBdIZc           $E001: 20 C9 FF  JSR $FFC9
    A:7C X:00 Y:00 S:F3 P:nvUBdIZc             $FFC9: AD 69 07  LDA $0769 Bank Switch = #$01
    A:01 X:00 Y:00 S:F3 P:nvUBdIzc             $FFCC: 8D 00 E0  STA $E000 = #$FF
    A:01 X:00 Y:00 S:F3 P:nvUBdIzc             $FFCF: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZC             $FFD0: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZC             $FFD3: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFD4: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFD7: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFD8: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFDB: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFDC: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFDF: 60        RTS (from $FFC9) ----------------------------
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $E004: B1 0E     LDA ($0E),Y @ $7C00 = #$BB
    A:BB X:00 Y:00 S:F5 P:NvUBdIzc           $E006: 29 0F     AND #$0F
    A:0B X:00 Y:00 S:F5 P:nvUBdIzc           $E008: 85 02     STA $02 = #$0B
    A:0B X:00 Y:00 S:F5 P:nvUBdIzc           $E00A: B1 0E     LDA ($0E),Y @ $7C00 = #$BB
    A:BB X:00 Y:00 S:F5 P:NvUBdIzc           $E00C: 4A        LSR
    A:5D X:00 Y:00 S:F5 P:nvUBdIzC           $E00D: 4A        LSR
    A:2E X:00 Y:00 S:F5 P:nvUBdIzC           $E00E: 4A        LSR
    A:17 X:00 Y:00 S:F5 P:nvUBdIzc           $E00F: 4A        LSR
    A:0B X:00 Y:00 S:F5 P:nvUBdIzC           $E010: 38        SEC
    A:0B X:00 Y:00 S:F5 P:nvUBdIzC           $E011: 65 03     ADC $03 = #$00
    A:0C X:00 Y:00 S:F5 P:nvUBdIzc           $E013: 85 03     STA $03 = #$00
    A:0C X:00 Y:00 S:F5 P:nvUBdIzc           $E015: 48        PHA
    A:0C X:00 Y:00 S:F4 P:nvUBdIzc            $E016: 20 C5 FF  JSR $FFC5

### Exit issue

    ; These two repeat over and over
    A:0B X:FF Y:01 S:F7 P:nvUBdIZC         $C1DD: 20 30 CF  JSR $CF30
    A:0B X:FF Y:01 S:F5 P:nvUBdIZC           $CF30: AD 06 07  LDA $0706 Overworld Index = #$00
    A:00 X:FF Y:01 S:F5 P:nvUBdIZC           $CF33: 0A        ASL
    A:00 X:FF Y:01 S:F5 P:nvUBdIZc           $CF34: 0A        ASL
    A:00 X:FF Y:01 S:F5 P:nvUBdIZc           $CF35: 6D 06 07  ADC $0706 Overworld Index = #$00
    A:00 X:FF Y:01 S:F5 P:nvUBdIZc           $CF38: 6D 07 07  ADC $0707 World = #$00
    A:00 X:FF Y:01 S:F5 P:nvUBdIZc           $CF3B: 60        RTS (from $CF30) ----------------------------
    A:00 X:FF Y:01 S:F7 P:nvUBdIZc         $C1E0: C9 01     CMP #$01
    A:00 X:FF Y:01 S:F7 P:NvUBdIzc         $C1E2: D0 22     BNE $C206

    ...

    A:00 X:FF Y:02 S:F9 P:nvUBdIZc       $D50A: 20 E5 80  JSR $80E5
    A:00 X:FF Y:02 S:F7 P:nvUBdIZc         $80E5: AD 07 07  LDA $0707 World = #$00
    A:00 X:FF Y:02 S:F7 P:nvUBdIZc         $80E8: 0D 61 05  ORA $0561 current scene/map index = #$21
    A:21 X:FF Y:02 S:F7 P:nvUBdIzc         $80EB: 0D 06 07  ORA $0706 Overworld Index = #$00
    A:21 X:FF Y:02 S:F7 P:nvUBdIzc         $80EE: D0 4F     BNE $813F

    ; THIS SECTION WHERE IT SKIPS MIGHT BE IMPORTANT

    A:21 X:FF Y:02 S:F7 P:nvUBdIzc         $813F: 60        RTS (from $80E5) ----------------------------
    A:21 X:FF Y:02 S:F9 P:nvUBdIzc       $D50D: 20 47 98  JSR $9847
    ; End these two

    A:F8 X:09 Y:00 S:F9 P:nvUBdIZc       $CF4F: 20 C9 FF  JSR $FFC9
    A:F8 X:09 Y:00 S:F7 P:nvUBdIZc         $FFC9: AD 69 07  LDA $0769 Bank Switch = #$01
    A:01 X:09 Y:00 S:F7 P:nvUBdIzc         $FFCC: 8D 00 E0  STA $E000 = #$FF
    A:01 X:09 Y:00 S:F7 P:nvUBdIzc         $FFCF: 4A        LSR
    A:00 X:09 Y:00 S:F7 P:nvUBdIZC         $FFD0: 8D 00 E0  STA $E000 = #$FF
    A:00 X:09 Y:00 S:F7 P:nvUBdIZC         $FFD3: 4A        LSR
    A:00 X:09 Y:00 S:F7 P:nvUBdIZc         $FFD4: 8D 00 E0  STA $E000 = #$FF
    A:00 X:09 Y:00 S:F7 P:nvUBdIZc         $FFD7: 4A        LSR
    A:00 X:09 Y:00 S:F7 P:nvUBdIZc         $FFD8: 8D 00 E0  STA $E000 = #$FF
    A:00 X:09 Y:00 S:F7 P:nvUBdIZc         $FFDB: 4A        LSR
    A:00 X:09 Y:00 S:F7 P:nvUBdIZc         $FFDC: 8D 00 E0  STA $E000 = #$FF
    A:00 X:09 Y:00 S:F7 P:nvUBdIZc         $FFDF: 60        RTS (from $FFC9) ----------------------------
    A:00 X:09 Y:00 S:F9 P:nvUBdIZc       $CF52: AD 61 05  LDA $0561 current scene/map index = #$21
    A:21 X:09 Y:00 S:F9 P:nvUBdIzc       $CF55: AC 07 07  LDY $0707 World = #$00
    A:21 X:09 Y:00 S:F9 P:nvUBdIZc       $CF58: D0 06     BNE $CF60
    A:21 X:09 Y:00 S:F9 P:nvUBdIZc       $CF5A: C9 1D     CMP #$1D
    A:21 X:09 Y:00 S:F9 P:nvUBdIzC       $CF5C: 90 02     BCC $CF60
    A:21 X:09 Y:00 S:F9 P:nvUBdIzC       $CF5E: A9 00     LDA #$00
    A:00 X:09 Y:00 S:F9 P:nvUBdIZC       $CF60: 0A        ASL
    A:00 X:09 Y:00 S:F9 P:nvUBdIZc       $CF61: 0A        ASL
    A:00 X:09 Y:00 S:F9 P:nvUBdIZc       $CF62: 65 3B     ADC $3B = #$03
    A:03 X:09 Y:00 S:F9 P:nvUBdIzc       $CF64: A8        TAY
    A:03 X:09 Y:03 S:F9 P:nvUBdIzc       $CF65: B9 FC 6A  LDA $6AFC Room Connectivity Data,Y @ $6AFF Do
    A:FC X:09 Y:03 S:F9 P:NvUBdIzc       $CF68: 48        PHA
    A:FC X:09 Y:03 S:F8 P:NvUBdIzc        $CF69: 29 FC     AND #$FC
    A:FC X:09 Y:03 S:F8 P:NvUBdIzc        $CF6B: C9 FC     CMP #$FC
    A:FC X:09 Y:03 S:F8 P:nvUBdIZC        $CF6D: D0 43     BNE $CFB2
    A:FC X:09 Y:03 S:F8 P:nvUBdIZC        $CF6F: 68        PLA
    A:FC X:09 Y:03 S:F9 P:NvUBdIzC       $CF70: 29 03     AND #$03
    A:00 X:09 Y:03 S:F9 P:nvUBdIZC       $CF72: 18        CLC
    A:00 X:09 Y:03 S:F9 P:nvUBdIZc       $CF73: 6D 48 07  ADC $0748 Area Location Index = #$01
    A:01 X:09 Y:03 S:F9 P:nvUBdIzc       $CF76: 8D 48 07  STA $0748 Area Location Index = #$01
    A:01 X:09 Y:03 S:F9 P:nvUBdIzc       $CF79: A0 00     LDY #$00
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CF7B: 8C FF 07  STY $07FF = #$00
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CF7E: 8C E9 05  STY $05E9 = #$04
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CF81: A0 90     LDY #$90
    A:01 X:09 Y:90 S:F9 P:NvUBdIzc       $CF83: 8C 00 40  STY SQ1_VOL = #$91
    A:01 X:09 Y:90 S:F9 P:NvUBdIzc       $CF86: A9 01     LDA #$01
    A:01 X:09 Y:90 S:F9 P:nvUBdIzc       $CF88: AC 07 07  LDY $0707 World = #$00
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CF8B: F0 10     BEQ $CF9D
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CF9D: A0 04     LDY #$04
    A:01 X:09 Y:04 S:F9 P:nvUBdIzc       $CF9F: 8C E9 05  STY $05E9 = #$00
    A:01 X:09 Y:04 S:F9 P:nvUBdIzc       $CFA2: AC 06 07  LDY $0706 Overworld Index = #$00
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CFA5: D0 F3     BNE $CF9A
    A:01 X:09 Y:00 S:F9 P:nvUBdIZc       $CFA7: AC 61 05  LDY $0561 current scene/map index = #$21
    A:01 X:09 Y:21 S:F9 P:nvUBdIzc       $CFAA: D0 EE     BNE $CF9A
    A:01 X:09 Y:21 S:F9 P:nvUBdIzc       $CF9A: 4C F8 CF  JMP $CFF8
    A:01 X:09 Y:21 S:F9 P:nvUBdIzc       $CFF8: 8D 36 07  STA $0736 Game Mode/Current State = #$10
    A:01 X:09 Y:21 S:F9 P:nvUBdIzc       $CFFB: 60        RTS (from $C2CA) ----------------------------

$CF52 Load current scene/map index into accumulator ($21)
$CF55 Load world into Y (#$00)
>$CF58 If world number was not zero, jump to $CF60
$CF5A Compare accumulator with #$1D (29)
$CF5C Branch if accumulator is less than #$1D (29) to $CF60
$CF5E Load #$0 into accumulator
$CF60 Shift left
$CF61 Shift left
$CF62 Add what is at memory location $3B (#$03) to accumulator
$CF64 Transfer accumulator to index Y (TAY)
$CF65 Loading room connectivity data into accumulator from $6AFC,Y ($6AFF)
$CF68 Push accumulator (room connectivity data) onto the stack
$CF69 Mask accumulator with #$FC (0b11111100) (I believe that's the map number)
$CF6B Compare with #$FC
>$CF6D If not equal, branch to $CFB2
$CF68 Pull accumulator from the stack
$CF70 Mask accumulator with #$03 (0b00000011)
$CF72 Clear carry flag
$CF73 Add area location index to accumulator
$CF76 Store accumulator back to area location index
$CF79 Reset Y to 0
$CF7B Store Y to $07FF
$CF7E Store Y to $05E9
$CF81 Load Y with #$90
$CF83 Store Y to SQ1_VOL?
$CF86 Load accumulator with value #$00
$CF88 Load Y with world number
>$CF8B If world number is zero, branch to $CF9D
...
$CF9D Load y with #$04
$CF9F Store y to $05E9
$CFA2 Load overworld index into Y 
>$CFA5 If overworld index is not zero, branch back to $CF9A  
$CFA7 Load current scene/map index into Y
>$CFAA If map number is not zero, branch back to $CF9A
$CF9A Jump to $CFF8
...
$CFF8 Store accumlator (01) to current game mode/current state (which was previously $10)

$C1A8 PPU Shit

$C010 Load game mode/current state into accumulator
$C013 Compare against #$08
>$C015 Jump to $C01B if equal
$C017 Compare against #$14
$C019 Go back to $C010 if not equal

$D168 Load game mode into accumulator
$D16B Compare game mode to value in $0737
$D16E Store accumulator into $0737
>$D171 If game mode not equal to value in $0737 (#$10), then jump to $D18D

$CCB3 Zero accumulator
$CCB5 Store accumulator into return to overworld (#$00)
$CCB8 Store accumulator into $075B
$CCBB Load area location index (#$01) into Y
$CCBE Load accumulator with data at $6A00,Y (Overworld destinations table) $6A01 (Y position)
>$CCC1 If value loaded wasn't 0, then branch to $CCCC
...
$CCCC Mask the accumulator with #$7F (0b01111111)
$CCCE Store the accumulator to $73
$CCD0 Load accumulator with data at $6A3F,Y ($6A40) (X Position)
$CCD3 Mask the accumulator with $3F (0b00111111)
$CCD5 Store the accumulator with to $74
$CCD7 Load accumulator with data at $6ABD,Y ($6ABE) (World Number)
$CCDA Mask the accumulator with $40 (0b01000000)
>$CCDC If masking set zero flag, jump to $CCF9

$CF05 Increment memory by 1 at Game Mode/Current State memory location

Enter $C010 loop again

$C07B Some long process involving the PPU

Back to $D168

$81A9 Increment game mode/current status

Enter $C010 loop again

$C07B Again

$C19B Some loop incrementing X
    Rotating right one bit memory at $051A,X ($051A - $0522)

$D254 Some loop incrementing Y
    Storing data at $0200,Y ($0204 - $02FC) 4 bytes at a time

$FFC9 Loading bank switch into accumulator.

$8C39 Storing accumulator data (#$0C) into ($048C - $0499)

$FFC9 Again

$8C39 Storing accumulator data (#$04) into ($049A - $04A1)

$FFC9 Again

$8C39 Storing accumulator data (#$0C) into ($04A2 - $04B1)

$FFC9 Again

$8C39 Storing accumulator data (#$0C) into ($04B2 - $04BD)

$FFC9 Again

$8C39 Storing accumulator data (#$0B) into ($0480 - $048C)


...does this a lot...

