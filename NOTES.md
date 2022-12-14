# Notes

## Randomization Process (what I have so far)

* RP1: Randomly generate template (unless already defined)
* RP2: Randomly generate links between isolated areas
* RP3: Randomly distribute locations that bear items and require remedies
* RP4: Generate a connection graph
* RP5: Randomly distribute required items/spells/ability towns
    RP5.1: Start at North Palace (NODE0) and traverse the graph keeping track of all accessible and inaccessible locations.
    RP5.2: Randomly pick an inaccessible location and it's remedy and place remedy in a random accessible location.
        RP5.2.1 ???
    RP5.3: PROFIT
* RP6: Randomly distribute remaining locations
* RP6: Randomly distribute remaining optional and small items among the remaining item bearing locations

## Game Notes

External means to go to a different continent

The map number doesn't matter if the mapset is 0 (world)

The index in the list of locations is what determines where the destination in the new continent is.

In order to change where the element dumps you, you would need to either swap locations or move the x, y of the destination you want.

## 6502 Assembly Notes

### Registers

All of the below are 1 byte in size

    A  => Accumulator
    X  => X Index Register
    Y  => Y Index Register
    PC => Program Counter
    S  => Stack Pointer
    P  => Status

### Status Flags

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

### Operations

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

### Playing with 6502 ASM
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

### Notes for issue with missing exit numbers

    ; Loading probably looks something like this
        STX #$00        ; Initialize X to 0
    A   LDA $XXXX,X     ; Load a byte from $AAAA + X
        STA $YYYY,Y     ; Store a byte to $BBBB + X
        INX             ; Increment X
        CPX #$C         ; Check to see if $C bytes have been read
        BEQ A           ; If not complete, jump back to A

## Code analysis

### Checking for passthrough
    07:CCB5: 8D 09 07  STA $0709 Return to Overworld? = #$00
    07:CCB8: 8D 5B 07  STA $075B = #$00
    07:CCBB: AC 48 07  LDY $0748 Area Location Index = #$07
    07:CCBE: B9 00 6A  LDA $6A00,Y @ $6A07 = #$39
    07:CCC1: D0 09     BNE $CCCC
    07:CCC3: A9 3D     LDA #$3D
    07:CCC5: D9 3F 6A  CMP $6A3F,Y @ $6A46 = #$3D
    07:CCC8: D0 E5     BNE $CCAF
    07:CCCA: A9 51     LDA #$51
    07:CCCC: 29 7F     AND #$7F
    07:CCCE: 85 73     STA $73 Y Position on map = #$39
    07:CCD0: B9 3F 6A  LDA $6A3F,Y @ $6A46 = #$3D
    07:CCD3: 29 3F     AND #$3F
    07:CCD5: 85 74     STA $74 X position on map = #$3D
    07:CCD7: B9 BD 6A  LDA $6ABD,Y @ $6AC4 = #$40               ;$6ABD is the address of world number info
    >07:CCDA: 29 40     AND #$40                                ;#$40 is 0b0100000 which is the mask for the passthrough bit
    07:CCDC: F0 1B     BEQ $CCF9                                ;Branch if passthrough bit not set
    07:CCDE: AE 62 05  LDX $0562 = #$08
    07:CCE1: E0 04     CPX #$04
    07:CCE3: B0 1A     BCS $CCFF
    07:CCE5: E6 74     INC $74 X position on map = #$3D
    07:CCE7: A6 5F     LDX $5F = #$01
    07:CCE9: B9 00 6A  LDA $6A00,Y @ $6A07 = #$39
    07:CCEC: 0A        ASL
    07:CCED: 90 03     BCC $CCF2
    07:CCEF: AE 62 05  LDX $0562 = #$08
    07:CCF2: CA        DEX
    07:CCF3: F0 04     BEQ $CCF9
    07:CCF5: C6 74     DEC $74 X position on map = #$3D
    07:CCF7: C6 74     DEC $74 X position on map = #$3D
    07:CCF9: 20 C5 FF  JSR $FFC5
    07:CCFC: 4C 05 CF  JMP $CF05
    07:CCFF: E6 73     INC $73 Y Position on map = #$39
    07:CD01: A6 5F     LDX $5F = #$01
    07:CD03: B9 00 6A  LDA $6A00,Y @ $6A07 = #$39
    07:CD06: 0A        ASL
    07:CD07: 90 06     BCC $CD0F
    07:CD09: AD 62 05  LDA $0562 = #$08
    07:CD0C: 4A        LSR
    07:CD0D: 4A        LSR
    07:CD0E: AA        TAX
    07:CD0F: CA        DEX
    07:CD10: F0 E7     BEQ $CCF9
    07:CD12: C6 73     DEC $73 Y Position on map = #$39
    07:CD14: C6 73     DEC $73 Y Position on map = #$39
    07:CD16: 4C F9 CC  JMP $CCF9
    07:CD19: 20 5C D1  JSR $D15C
    07:CD1C: 20 85 D3  JSR $D385
    07:CD1F: 21 CF     AND ($CF,X) @ $0000 = #$00
    07:CD21: 05 CF     ORA $CF = #$00
    07:CD23: 1F        UNDEFINED
    07:CD24: 86 FC     STX $FC = #$00
    07:CD26: A0 00     LDY #$00
    07:CD28: 02        UNDEFINED
    07:CD29: 00        BRK
    07:CD2A: 04        UNDEFINED
    07:CD2B: 05 09     ORA $09 = #$0F
    07:CD2D: 09 0A     ORA #$0A
    07:CD2F: 0A        ASL
    07:CD30: 0A        ASL
    07:CD31: 0A        ASL
    07:CD32: 0B        UNDEFINED
    07:CD33: 0C        UNDEFINED
    07:CD34: 06 00     ASL $00 = #$00
    07:CD36: 10 20     BPL $CD58
    07:CD38: 20 30 30  JSR $3030
    07:CD3B: 30 30     BMI $CD6D
    07:CD3D: 40        RTI
    07:CD3E: 50 60     BVC $CDA0
    07:CD40: AC 07 07  LDY $0707 World = #$00
    07:CD43: B9 B7 C4  LDA $C4B7,Y @ $C4BE = #$00
    07:CD46: C9 01     CMP #$01
    07:CD48: D0 0F     BNE $CD59
    07:CD4A: AC 06 07  LDY $0706 Overworld Index = #$00
    07:CD4D: F0 0A     BEQ $CD59
    07:CD4F: 88        DEY
    07:CD50: D0 05     BNE $CD57
    07:CD52: AC 0A 07  LDY $070A Previous Region = #$00
    07:CD55: F0 02     BEQ $CD59
    07:CD57: A9 02     LDA #$02
    07:CD59: 8D 69 07  STA $0769 Bank Switch = #$01
    07:CD5C: 20 CC FF  JSR $FFCC
    07:CD5F: AD 69 07  LDA $0769 Bank Switch = #$01
    07:CD62: AC 07 07  LDY $0707 World = #$00
    07:CD65: C0 03     CPY #$03
    07:CD67: 90 0F     BCC $CD78
    07:CD69: AD 06 07  LDA $0706 Overworld Index = #$00
    07:CD6C: 0A        ASL
    07:CD6D: 0A        ASL
    07:CD6E: 6D 6C 05  ADC $056C = #$00
    07:CD71: A8        TAY
    07:CD72: B9 2A CD  LDA $CD2A,Y @ $CD31 = #$0A



### Loading overworld map

    A:00 X:00 Y:00 S:F7 P:NvUBdIzc         $8C2D: 20 48 8C  JSR $8C48
    A:00 X:00 Y:00 S:F5 P:NvUBdIzc           $8C48: 0A        ASL
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C49: A8        TAY
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C4A: B9 00 60  LDA $6000,Y @ $6000 = #$00    ;Lower part of compressed map address is stored here
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C4D: 85 0E     STA $0E = #$FE
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $8C4F: B9 01 60  LDA $6001,Y @ $6001 = #$7C    ;Upper part of compressed map address is stored here
    A:7C X:00 Y:00 S:F5 P:nvUBdIzc           $8C52: 85 0F     STA $0F = #$8B
    A:7C X:00 Y:00 S:F5 P:nvUBdIzc           $8C54: A0 00     LDY #$00
    A:7C X:00 Y:00 S:F5 P:nvUBdIZc           $8C56: 60        RTS (from $8C48) ----------------------------
    A:7C X:00 Y:00 S:F7 P:nvUBdIZc         $8C30: 20 01 E0  JSR $E001
    A:7C X:00 Y:00 S:F5 P:nvUBdIZc           $E001: 20 C9 FF  JSR $FFC9
    A:7C X:00 Y:00 S:F3 P:nvUBdIZc             $FFC9: AD 69 07  LDA $0769 Bank Switch = #$01
    A:01 X:00 Y:00 S:F3 P:nvUBdIzc             $FFCC: 8D 00 E0  STA $E000 = #$FF ; Remove bottom four bits
    A:01 X:00 Y:00 S:F3 P:nvUBdIzc             $FFCF: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZC             $FFD0: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZC             $FFD3: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFD4: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFD7: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFD8: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFDB: 4A        LSR
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFDC: 8D 00 E0  STA $E000 = #$FF
    A:00 X:00 Y:00 S:F3 P:nvUBdIZc             $FFDF: 60        RTS (from $FFC9) ----------------------------
    A:00 X:00 Y:00 S:F5 P:nvUBdIZc           $E004: B1 0E     LDA ($0E),Y @ $7C00 = #$BB    ;Load address of compressed world map into accumulator
    A:BB X:00 Y:00 S:F5 P:NvUBdIzc           $E006: 29 0F     AND #$0F                      ;Mask #$0F (0b00001111) to get type
    A:0B X:00 Y:00 S:F5 P:nvUBdIzc           $E008: 85 02     STA $02 = #$0B                ;Store type into $02
    A:0B X:00 Y:00 S:F5 P:nvUBdIzc           $E00A: B1 0E     LDA ($0E),Y @ $7C00 = #$BB    ;Load address of compressed world map into accumulator
    A:BB X:00 Y:00 S:F5 P:NvUBdIzc           $E00C: 4A        LSR                           ;Remove lower 4 bites
    A:5D X:00 Y:00 S:F5 P:nvUBdIzC           $E00D: 4A        LSR
    A:2E X:00 Y:00 S:F5 P:nvUBdIzC           $E00E: 4A        LSR
    A:17 X:00 Y:00 S:F5 P:nvUBdIzc           $E00F: 4A        LSR
    A:0B X:00 Y:00 S:F5 P:nvUBdIzC           $E010: 38        SEC                           ;Set carry flag
    A:0B X:00 Y:00 S:F5 P:nvUBdIzC           $E011: 65 03     ADC $03 = #$00                ;Add value in $03 to accumulator
    A:0C X:00 Y:00 S:F5 P:nvUBdIzc           $E013: 85 03     STA $03 = #$00                ;Store run length into $03
    A:0C X:00 Y:00 S:F5 P:nvUBdIzc           $E015: 48        PHA                           ;Push accumulator to stack
    A:0C X:00 Y:00 S:F4 P:nvUBdIzc            $E016: 20 C5 FF  JSR $FFC5                    ;Jump to $FFC5

    $02 holds type of block to draw
    $03 holds current position for drawing based on run length

### Exit issue

#### Solution

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

    On line $CF5A the mapNumber is compared to $1D (29).
    So basically if the mapNumber is greater than 29 and the "world" is zero (meaning it's overworld or in technical terms banks 1 and 2), then it uses the level exits at mapNumber 0 (which has 63 for all four exits).
    LDA loads the data at the provided memory location into the accumulator.
    LDY does the same but it loads into the Y register
    BNE branches if the Z flag is set.  The Z flag gets set when a LD operation loads a zero value or when a CMP op finds the two values equal.
    CMP compares the accumulator with the value in a memory location.  It sets the Z flag if the two are equal, and it sets the C flag if the accumulator is less.
    ASL shifts left (multiplies by 2)
    ADC adds the value at memory address to the accumulator
    TAY transfers the value of the accumulator to the Y register

    Note #$XX is an immediate value instead of a memory address.  So for example #$FF is the byte 0xFF.

    ASL ASL is multiplying by 4 (because each level connection entry is 4 bytes).
    LDA $6AFC,Y is loading from $6AFC + Y
    $3B holds the current map page
    $0707 holds the world
    $0561 holds the current map (edited)
    I am in world 0 (#$00)
    I am in trophy cave (#$21)
    I am in map page 3 (#$03) (edited)

#### Notes

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

Here are some line by like notes I took to understand the code.

    $CF52 Load current scene/map index into accumulator ($21)
    $CF55 Load world into Y (#$00)
    $CF58 If world number was not zero, jump to $CF60
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
    $CF6D If not equal, branch to $CFB2
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
    $CF8B If world number is zero, branch to $CF9D
    ...
    $CF9D Load y with #$04
    $CF9F Store y to $05E9
    $CFA2 Load overworld index into Y 
    $CFA5 If overworld index is not zero, branch back to $CF9A  
    $CFA7 Load current scene/map index into Y
    $CFAA If map number is not zero, branch back to $CF9A
    $CF9A Jump to $CFF8
    ...
    $CFF8 Store accumlator (01) to current game mode/current state (which was previously $10)

    $C1A8 PPU Shit

    $C010 Load game mode/current state into accumulator
    $C013 Compare against #$08
    $C015 Jump to $C01B if equal
    $C017 Compare against #$14
    $C019 Go back to $C010 if not equal

    $D168 Load game mode into accumulator
    $D16B Compare game mode to value in $0737
    $D16E Store accumulator into $0737
    $D171 If game mode not equal to value in $0737 (#$10), then jump to $D18D

    $CCB3 Zero accumulator
    $CCB5 Store accumulator into return to overworld (#$00)
    $CCB8 Store accumulator into $075B
    $CCBB Load area location index (#$01) into Y
    $CCBE Load accumulator with data at $6A00,Y (Overworld destinations table) $6A01 (Y position)
    $CCC1 If value loaded wasn't 0, then branch to $CCCC
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

