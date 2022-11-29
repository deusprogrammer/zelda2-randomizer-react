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