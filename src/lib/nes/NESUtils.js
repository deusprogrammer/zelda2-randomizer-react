const calculateNESOffsets = (headers) => {
    let trainerSize = headers.trainer === 1 ? 0x0200 : 0;
    let prgRomSize = headers.prgRomSize * 0x4000;
    let chrRomSize = headers.chrRomSize * 0x2000;

    return {
        HEADER: {
            size: 0x10,
            offset: 0x00
        },
        TRAINER: {
            size: trainerSize,
            offset: 0x10
        },
        PRG_ROM: {
            size: prgRomSize,
            offset: 0x10 + trainerSize
        },
        CHR_ROM: {
            size: chrRomSize,
            offset: 0x10 + trainerSize + prgRomSize
        }
    };
}

exports.calculateNESOffsets = calculateNESOffsets;