/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "mineplex.mint.v1beta1";

export interface RewardPeriod {
  fromHeight: number;
  toHeight: number;
  rewardPerBlock: string;
}

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mintDenom: string;
  periods: RewardPeriod[];
}

function createBaseRewardPeriod(): RewardPeriod {
  return { fromHeight: 0, toHeight: 0, rewardPerBlock: "" };
}

export const RewardPeriod = {
  encode(message: RewardPeriod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromHeight !== 0) {
      writer.uint32(8).int64(message.fromHeight);
    }
    if (message.toHeight !== 0) {
      writer.uint32(16).int64(message.toHeight);
    }
    if (message.rewardPerBlock !== "") {
      writer.uint32(26).string(message.rewardPerBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardPeriod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardPeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromHeight = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.toHeight = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.rewardPerBlock = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardPeriod {
    return {
      fromHeight: isSet(object.fromHeight) ? Number(object.fromHeight) : 0,
      toHeight: isSet(object.toHeight) ? Number(object.toHeight) : 0,
      rewardPerBlock: isSet(object.rewardPerBlock) ? String(object.rewardPerBlock) : "",
    };
  },

  toJSON(message: RewardPeriod): unknown {
    const obj: any = {};
    message.fromHeight !== undefined && (obj.fromHeight = Math.round(message.fromHeight));
    message.toHeight !== undefined && (obj.toHeight = Math.round(message.toHeight));
    message.rewardPerBlock !== undefined && (obj.rewardPerBlock = message.rewardPerBlock);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardPeriod>, I>>(object: I): RewardPeriod {
    const message = createBaseRewardPeriod();
    message.fromHeight = object.fromHeight ?? 0;
    message.toHeight = object.toHeight ?? 0;
    message.rewardPerBlock = object.rewardPerBlock ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return { mintDenom: "", periods: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    for (const v of message.periods) {
      RewardPeriod.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintDenom = reader.string();
          break;
        case 2:
          message.periods.push(RewardPeriod.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      mintDenom: isSet(object.mintDenom) ? String(object.mintDenom) : "",
      periods: Array.isArray(object?.periods) ? object.periods.map((e: any) => RewardPeriod.fromJSON(e)) : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    if (message.periods) {
      obj.periods = message.periods.map((e) => e ? RewardPeriod.toJSON(e) : undefined);
    } else {
      obj.periods = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mintDenom = object.mintDenom ?? "";
    message.periods = object.periods?.map((e) => RewardPeriod.fromPartial(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}