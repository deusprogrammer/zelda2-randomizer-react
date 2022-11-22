const NES_HEADER_MAP = [
    {
        name: "nesHeader",
        relOffset: 0x0,
        size: 0x4,
        mask: 0xFFFFFF
    },
    {
        name: "prgRomSize",
        relOffset: 0x4
    },
    {
        name: "chrRomSize",
        relOffset: 0x5
    },
    {
        name: "mirroring",
        relOffset: 0x6,
        mask: 0b00000001
    },
    {
        name: "battery",
        relOffset: 0x6,
        mask: 0b00000010
    },
    {
        name: "trainer",
        relOffset: 0x6,
        mask: 0b00000100
    },
    {
        name: "ignoreMirroring",
        relOffset: 0x6,
        mask: 0b00001000
    },
    {
        name: "lowerMapperNumber",
        relOffset: 0x6,
        mask: 0b11110000
    },
    {
        name: "vsUniSystem",
        relOffset: 0x7,
        mask: 0b00000001
    },
    {
        name: "playChoice",
        relOffset: 0x7,
        mask: 0b00000010
    },
    {
        name: "nes2_0",
        relOffset: 0x7,
        mask: 0b00000100
    },
    {
        name: "upperMapperNumber",
        relOffset: 0x7,
        mask: 0b11110000
    },
    {
        name: "prgRamSize",
        relOffset: 0x8,
        mask: 0b11111110
    },
    {
        name: "tvSystem1",
        relOffset: 0x8,
        mask: 0b00000001
    },
    {
        name: "reserved",
        relOffset: 0x8,
        mask: 0b11111110
    },
    {
        name: "tvSystem2",
        relOffset: 0x9,
        mask: 0b00000011
    },
    {
        name: "prgRam",
        relOffset: 0x9,
        mask: 0b00010000
    },
    {
        name: "busConfig",
        relOffset: 0x9,
        mask: 0b00100000
    },
    {
        name: "padding",
        relOffset: 0xA,
        size: 4
    }
]

const PPU_ADDRESS_MAP = [
    {
        name: "patternTableSide",
        relOffset: 0x01000000,

    },
    {
        name: "tileRow",
        relOffset: 0x00111100,

    },
];

exports.NES_HEADER_MAP = NES_HEADER_MAP;