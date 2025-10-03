
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model FormStep
 * 
 */
export type FormStep = $Result.DefaultSelection<Prisma.$FormStepPayload>
/**
 * Model StepOption
 * 
 */
export type StepOption = $Result.DefaultSelection<Prisma.$StepOptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StepType: {
  SELECT: 'SELECT',
  NUMBER: 'NUMBER',
  TEXT: 'TEXT',
  CHECKBOX: 'CHECKBOX'
};

export type StepType = (typeof StepType)[keyof typeof StepType]


export const PricingImpact: {
  BASE: 'BASE',
  MULTIPLIER: 'MULTIPLIER',
  ADDITIVE: 'ADDITIVE',
  NONE: 'NONE'
};

export type PricingImpact = (typeof PricingImpact)[keyof typeof PricingImpact]

}

export type StepType = $Enums.StepType

export const StepType: typeof $Enums.StepType

export type PricingImpact = $Enums.PricingImpact

export const PricingImpact: typeof $Enums.PricingImpact

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formStep`: Exposes CRUD operations for the **FormStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormSteps
    * const formSteps = await prisma.formStep.findMany()
    * ```
    */
  get formStep(): Prisma.FormStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stepOption`: Exposes CRUD operations for the **StepOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StepOptions
    * const stepOptions = await prisma.stepOption.findMany()
    * ```
    */
  get stepOption(): Prisma.StepOptionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Product: 'Product',
    FormStep: 'FormStep',
    StepOption: 'StepOption'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "product" | "formStep" | "stepOption"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      FormStep: {
        payload: Prisma.$FormStepPayload<ExtArgs>
        fields: Prisma.FormStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>
          }
          findFirst: {
            args: Prisma.FormStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>
          }
          findMany: {
            args: Prisma.FormStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>[]
          }
          create: {
            args: Prisma.FormStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>
          }
          createMany: {
            args: Prisma.FormStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>[]
          }
          delete: {
            args: Prisma.FormStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>
          }
          update: {
            args: Prisma.FormStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>
          }
          deleteMany: {
            args: Prisma.FormStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>[]
          }
          upsert: {
            args: Prisma.FormStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormStepPayload>
          }
          aggregate: {
            args: Prisma.FormStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormStep>
          }
          groupBy: {
            args: Prisma.FormStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormStepCountArgs<ExtArgs>
            result: $Utils.Optional<FormStepCountAggregateOutputType> | number
          }
        }
      }
      StepOption: {
        payload: Prisma.$StepOptionPayload<ExtArgs>
        fields: Prisma.StepOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StepOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StepOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>
          }
          findFirst: {
            args: Prisma.StepOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StepOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>
          }
          findMany: {
            args: Prisma.StepOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>[]
          }
          create: {
            args: Prisma.StepOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>
          }
          createMany: {
            args: Prisma.StepOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StepOptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>[]
          }
          delete: {
            args: Prisma.StepOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>
          }
          update: {
            args: Prisma.StepOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>
          }
          deleteMany: {
            args: Prisma.StepOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StepOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StepOptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>[]
          }
          upsert: {
            args: Prisma.StepOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepOptionPayload>
          }
          aggregate: {
            args: Prisma.StepOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStepOption>
          }
          groupBy: {
            args: Prisma.StepOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<StepOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.StepOptionCountArgs<ExtArgs>
            result: $Utils.Optional<StepOptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    product?: ProductOmit
    formStep?: FormStepOmit
    stepOption?: StepOptionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    steps: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | ProductCountOutputTypeCountStepsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormStepWhereInput
  }


  /**
   * Count Type FormStepCountOutputType
   */

  export type FormStepCountOutputType = {
    options: number
  }

  export type FormStepCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | FormStepCountOutputTypeCountOptionsArgs
  }

  // Custom InputTypes
  /**
   * FormStepCountOutputType without action
   */
  export type FormStepCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStepCountOutputType
     */
    select?: FormStepCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormStepCountOutputType without action
   */
  export type FormStepCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepOptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    baseImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    baseImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    baseImage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    baseImage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    baseImage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    baseImage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    baseImage: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    baseImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    steps?: boolean | Product$stepsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    baseImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    baseImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    baseImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "baseImage" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | Product$stepsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      steps: Prisma.$FormStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      baseImage: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends Product$stepsArgs<ExtArgs> = {}>(args?: Subset<T, Product$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly baseImage: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.steps
   */
  export type Product$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    where?: FormStepWhereInput
    orderBy?: FormStepOrderByWithRelationInput | FormStepOrderByWithRelationInput[]
    cursor?: FormStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormStepScalarFieldEnum | FormStepScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model FormStep
   */

  export type AggregateFormStep = {
    _count: FormStepCountAggregateOutputType | null
    _avg: FormStepAvgAggregateOutputType | null
    _sum: FormStepSumAggregateOutputType | null
    _min: FormStepMinAggregateOutputType | null
    _max: FormStepMaxAggregateOutputType | null
  }

  export type FormStepAvgAggregateOutputType = {
    order: number | null
    pricePerUnit1: number | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null
    pricePerUnit2: number | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null
  }

  export type FormStepSumAggregateOutputType = {
    order: number | null
    pricePerUnit1: number | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null
    pricePerUnit2: number | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null
  }

  export type FormStepMinAggregateOutputType = {
    id: string | null
    productId: string | null
    order: number | null
    type1: $Enums.StepType | null
    question1: string | null
    required1: boolean | null
    type2: $Enums.StepType | null
    question2: string | null
    required2: boolean | null
    pricingImpact1: $Enums.PricingImpact | null
    pricePerUnit1: number | null
    unit1: string | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null
    pricingImpact2: $Enums.PricingImpact | null
    pricePerUnit2: number | null
    unit2: string | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormStepMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    order: number | null
    type1: $Enums.StepType | null
    question1: string | null
    required1: boolean | null
    type2: $Enums.StepType | null
    question2: string | null
    required2: boolean | null
    pricingImpact1: $Enums.PricingImpact | null
    pricePerUnit1: number | null
    unit1: string | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null
    pricingImpact2: $Enums.PricingImpact | null
    pricePerUnit2: number | null
    unit2: string | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormStepCountAggregateOutputType = {
    id: number
    productId: number
    order: number
    type1: number
    question1: number
    required1: number
    type2: number
    question2: number
    required2: number
    pricingImpact1: number
    pricePerUnit1: number
    unit1: number
    minValue1: number
    maxValue1: number
    defaultValue1: number
    pricingImpact2: number
    pricePerUnit2: number
    unit2: number
    minValue2: number
    maxValue2: number
    defaultValue2: number
    conditionalOn: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FormStepAvgAggregateInputType = {
    order?: true
    pricePerUnit1?: true
    minValue1?: true
    maxValue1?: true
    defaultValue1?: true
    pricePerUnit2?: true
    minValue2?: true
    maxValue2?: true
    defaultValue2?: true
  }

  export type FormStepSumAggregateInputType = {
    order?: true
    pricePerUnit1?: true
    minValue1?: true
    maxValue1?: true
    defaultValue1?: true
    pricePerUnit2?: true
    minValue2?: true
    maxValue2?: true
    defaultValue2?: true
  }

  export type FormStepMinAggregateInputType = {
    id?: true
    productId?: true
    order?: true
    type1?: true
    question1?: true
    required1?: true
    type2?: true
    question2?: true
    required2?: true
    pricingImpact1?: true
    pricePerUnit1?: true
    unit1?: true
    minValue1?: true
    maxValue1?: true
    defaultValue1?: true
    pricingImpact2?: true
    pricePerUnit2?: true
    unit2?: true
    minValue2?: true
    maxValue2?: true
    defaultValue2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormStepMaxAggregateInputType = {
    id?: true
    productId?: true
    order?: true
    type1?: true
    question1?: true
    required1?: true
    type2?: true
    question2?: true
    required2?: true
    pricingImpact1?: true
    pricePerUnit1?: true
    unit1?: true
    minValue1?: true
    maxValue1?: true
    defaultValue1?: true
    pricingImpact2?: true
    pricePerUnit2?: true
    unit2?: true
    minValue2?: true
    maxValue2?: true
    defaultValue2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormStepCountAggregateInputType = {
    id?: true
    productId?: true
    order?: true
    type1?: true
    question1?: true
    required1?: true
    type2?: true
    question2?: true
    required2?: true
    pricingImpact1?: true
    pricePerUnit1?: true
    unit1?: true
    minValue1?: true
    maxValue1?: true
    defaultValue1?: true
    pricingImpact2?: true
    pricePerUnit2?: true
    unit2?: true
    minValue2?: true
    maxValue2?: true
    defaultValue2?: true
    conditionalOn?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FormStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormStep to aggregate.
     */
    where?: FormStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormSteps to fetch.
     */
    orderBy?: FormStepOrderByWithRelationInput | FormStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormSteps
    **/
    _count?: true | FormStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormStepMaxAggregateInputType
  }

  export type GetFormStepAggregateType<T extends FormStepAggregateArgs> = {
        [P in keyof T & keyof AggregateFormStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormStep[P]>
      : GetScalarType<T[P], AggregateFormStep[P]>
  }




  export type FormStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormStepWhereInput
    orderBy?: FormStepOrderByWithAggregationInput | FormStepOrderByWithAggregationInput[]
    by: FormStepScalarFieldEnum[] | FormStepScalarFieldEnum
    having?: FormStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormStepCountAggregateInputType | true
    _avg?: FormStepAvgAggregateInputType
    _sum?: FormStepSumAggregateInputType
    _min?: FormStepMinAggregateInputType
    _max?: FormStepMaxAggregateInputType
  }

  export type FormStepGroupByOutputType = {
    id: string
    productId: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1: boolean
    type2: $Enums.StepType | null
    question2: string | null
    required2: boolean
    pricingImpact1: $Enums.PricingImpact
    pricePerUnit1: number | null
    unit1: string | null
    minValue1: number | null
    maxValue1: number | null
    defaultValue1: number | null
    pricingImpact2: $Enums.PricingImpact
    pricePerUnit2: number | null
    unit2: string | null
    minValue2: number | null
    maxValue2: number | null
    defaultValue2: number | null
    conditionalOn: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: FormStepCountAggregateOutputType | null
    _avg: FormStepAvgAggregateOutputType | null
    _sum: FormStepSumAggregateOutputType | null
    _min: FormStepMinAggregateOutputType | null
    _max: FormStepMaxAggregateOutputType | null
  }

  type GetFormStepGroupByPayload<T extends FormStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormStepGroupByOutputType[P]>
            : GetScalarType<T[P], FormStepGroupByOutputType[P]>
        }
      >
    >


  export type FormStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    order?: boolean
    type1?: boolean
    question1?: boolean
    required1?: boolean
    type2?: boolean
    question2?: boolean
    required2?: boolean
    pricingImpact1?: boolean
    pricePerUnit1?: boolean
    unit1?: boolean
    minValue1?: boolean
    maxValue1?: boolean
    defaultValue1?: boolean
    pricingImpact2?: boolean
    pricePerUnit2?: boolean
    unit2?: boolean
    minValue2?: boolean
    maxValue2?: boolean
    defaultValue2?: boolean
    conditionalOn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    options?: boolean | FormStep$optionsArgs<ExtArgs>
    _count?: boolean | FormStepCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formStep"]>

  export type FormStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    order?: boolean
    type1?: boolean
    question1?: boolean
    required1?: boolean
    type2?: boolean
    question2?: boolean
    required2?: boolean
    pricingImpact1?: boolean
    pricePerUnit1?: boolean
    unit1?: boolean
    minValue1?: boolean
    maxValue1?: boolean
    defaultValue1?: boolean
    pricingImpact2?: boolean
    pricePerUnit2?: boolean
    unit2?: boolean
    minValue2?: boolean
    maxValue2?: boolean
    defaultValue2?: boolean
    conditionalOn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formStep"]>

  export type FormStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    order?: boolean
    type1?: boolean
    question1?: boolean
    required1?: boolean
    type2?: boolean
    question2?: boolean
    required2?: boolean
    pricingImpact1?: boolean
    pricePerUnit1?: boolean
    unit1?: boolean
    minValue1?: boolean
    maxValue1?: boolean
    defaultValue1?: boolean
    pricingImpact2?: boolean
    pricePerUnit2?: boolean
    unit2?: boolean
    minValue2?: boolean
    maxValue2?: boolean
    defaultValue2?: boolean
    conditionalOn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formStep"]>

  export type FormStepSelectScalar = {
    id?: boolean
    productId?: boolean
    order?: boolean
    type1?: boolean
    question1?: boolean
    required1?: boolean
    type2?: boolean
    question2?: boolean
    required2?: boolean
    pricingImpact1?: boolean
    pricePerUnit1?: boolean
    unit1?: boolean
    minValue1?: boolean
    maxValue1?: boolean
    defaultValue1?: boolean
    pricingImpact2?: boolean
    pricePerUnit2?: boolean
    unit2?: boolean
    minValue2?: boolean
    maxValue2?: boolean
    defaultValue2?: boolean
    conditionalOn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FormStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "order" | "type1" | "question1" | "required1" | "type2" | "question2" | "required2" | "pricingImpact1" | "pricePerUnit1" | "unit1" | "minValue1" | "maxValue1" | "defaultValue1" | "pricingImpact2" | "pricePerUnit2" | "unit2" | "minValue2" | "maxValue2" | "defaultValue2" | "conditionalOn" | "createdAt" | "updatedAt", ExtArgs["result"]["formStep"]>
  export type FormStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    options?: boolean | FormStep$optionsArgs<ExtArgs>
    _count?: boolean | FormStepCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FormStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type FormStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $FormStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormStep"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      options: Prisma.$StepOptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      order: number
      type1: $Enums.StepType
      question1: string
      required1: boolean
      type2: $Enums.StepType | null
      question2: string | null
      required2: boolean
      pricingImpact1: $Enums.PricingImpact
      pricePerUnit1: number | null
      unit1: string | null
      minValue1: number | null
      maxValue1: number | null
      defaultValue1: number | null
      pricingImpact2: $Enums.PricingImpact
      pricePerUnit2: number | null
      unit2: string | null
      minValue2: number | null
      maxValue2: number | null
      defaultValue2: number | null
      conditionalOn: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["formStep"]>
    composites: {}
  }

  type FormStepGetPayload<S extends boolean | null | undefined | FormStepDefaultArgs> = $Result.GetResult<Prisma.$FormStepPayload, S>

  type FormStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormStepCountAggregateInputType | true
    }

  export interface FormStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormStep'], meta: { name: 'FormStep' } }
    /**
     * Find zero or one FormStep that matches the filter.
     * @param {FormStepFindUniqueArgs} args - Arguments to find a FormStep
     * @example
     * // Get one FormStep
     * const formStep = await prisma.formStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormStepFindUniqueArgs>(args: SelectSubset<T, FormStepFindUniqueArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormStepFindUniqueOrThrowArgs} args - Arguments to find a FormStep
     * @example
     * // Get one FormStep
     * const formStep = await prisma.formStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormStepFindUniqueOrThrowArgs>(args: SelectSubset<T, FormStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepFindFirstArgs} args - Arguments to find a FormStep
     * @example
     * // Get one FormStep
     * const formStep = await prisma.formStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormStepFindFirstArgs>(args?: SelectSubset<T, FormStepFindFirstArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepFindFirstOrThrowArgs} args - Arguments to find a FormStep
     * @example
     * // Get one FormStep
     * const formStep = await prisma.formStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormStepFindFirstOrThrowArgs>(args?: SelectSubset<T, FormStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormSteps
     * const formSteps = await prisma.formStep.findMany()
     * 
     * // Get first 10 FormSteps
     * const formSteps = await prisma.formStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formStepWithIdOnly = await prisma.formStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormStepFindManyArgs>(args?: SelectSubset<T, FormStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormStep.
     * @param {FormStepCreateArgs} args - Arguments to create a FormStep.
     * @example
     * // Create one FormStep
     * const FormStep = await prisma.formStep.create({
     *   data: {
     *     // ... data to create a FormStep
     *   }
     * })
     * 
     */
    create<T extends FormStepCreateArgs>(args: SelectSubset<T, FormStepCreateArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormSteps.
     * @param {FormStepCreateManyArgs} args - Arguments to create many FormSteps.
     * @example
     * // Create many FormSteps
     * const formStep = await prisma.formStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormStepCreateManyArgs>(args?: SelectSubset<T, FormStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FormSteps and returns the data saved in the database.
     * @param {FormStepCreateManyAndReturnArgs} args - Arguments to create many FormSteps.
     * @example
     * // Create many FormSteps
     * const formStep = await prisma.formStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FormSteps and only return the `id`
     * const formStepWithIdOnly = await prisma.formStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormStepCreateManyAndReturnArgs>(args?: SelectSubset<T, FormStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FormStep.
     * @param {FormStepDeleteArgs} args - Arguments to delete one FormStep.
     * @example
     * // Delete one FormStep
     * const FormStep = await prisma.formStep.delete({
     *   where: {
     *     // ... filter to delete one FormStep
     *   }
     * })
     * 
     */
    delete<T extends FormStepDeleteArgs>(args: SelectSubset<T, FormStepDeleteArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormStep.
     * @param {FormStepUpdateArgs} args - Arguments to update one FormStep.
     * @example
     * // Update one FormStep
     * const formStep = await prisma.formStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormStepUpdateArgs>(args: SelectSubset<T, FormStepUpdateArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormSteps.
     * @param {FormStepDeleteManyArgs} args - Arguments to filter FormSteps to delete.
     * @example
     * // Delete a few FormSteps
     * const { count } = await prisma.formStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormStepDeleteManyArgs>(args?: SelectSubset<T, FormStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormSteps
     * const formStep = await prisma.formStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormStepUpdateManyArgs>(args: SelectSubset<T, FormStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormSteps and returns the data updated in the database.
     * @param {FormStepUpdateManyAndReturnArgs} args - Arguments to update many FormSteps.
     * @example
     * // Update many FormSteps
     * const formStep = await prisma.formStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FormSteps and only return the `id`
     * const formStepWithIdOnly = await prisma.formStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormStepUpdateManyAndReturnArgs>(args: SelectSubset<T, FormStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FormStep.
     * @param {FormStepUpsertArgs} args - Arguments to update or create a FormStep.
     * @example
     * // Update or create a FormStep
     * const formStep = await prisma.formStep.upsert({
     *   create: {
     *     // ... data to create a FormStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormStep we want to update
     *   }
     * })
     */
    upsert<T extends FormStepUpsertArgs>(args: SelectSubset<T, FormStepUpsertArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepCountArgs} args - Arguments to filter FormSteps to count.
     * @example
     * // Count the number of FormSteps
     * const count = await prisma.formStep.count({
     *   where: {
     *     // ... the filter for the FormSteps we want to count
     *   }
     * })
    **/
    count<T extends FormStepCountArgs>(
      args?: Subset<T, FormStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormStepAggregateArgs>(args: Subset<T, FormStepAggregateArgs>): Prisma.PrismaPromise<GetFormStepAggregateType<T>>

    /**
     * Group by FormStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormStepGroupByArgs['orderBy'] }
        : { orderBy?: FormStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormStep model
   */
  readonly fields: FormStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    options<T extends FormStep$optionsArgs<ExtArgs> = {}>(args?: Subset<T, FormStep$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FormStep model
   */
  interface FormStepFieldRefs {
    readonly id: FieldRef<"FormStep", 'String'>
    readonly productId: FieldRef<"FormStep", 'String'>
    readonly order: FieldRef<"FormStep", 'Int'>
    readonly type1: FieldRef<"FormStep", 'StepType'>
    readonly question1: FieldRef<"FormStep", 'String'>
    readonly required1: FieldRef<"FormStep", 'Boolean'>
    readonly type2: FieldRef<"FormStep", 'StepType'>
    readonly question2: FieldRef<"FormStep", 'String'>
    readonly required2: FieldRef<"FormStep", 'Boolean'>
    readonly pricingImpact1: FieldRef<"FormStep", 'PricingImpact'>
    readonly pricePerUnit1: FieldRef<"FormStep", 'Float'>
    readonly unit1: FieldRef<"FormStep", 'String'>
    readonly minValue1: FieldRef<"FormStep", 'Float'>
    readonly maxValue1: FieldRef<"FormStep", 'Float'>
    readonly defaultValue1: FieldRef<"FormStep", 'Float'>
    readonly pricingImpact2: FieldRef<"FormStep", 'PricingImpact'>
    readonly pricePerUnit2: FieldRef<"FormStep", 'Float'>
    readonly unit2: FieldRef<"FormStep", 'String'>
    readonly minValue2: FieldRef<"FormStep", 'Float'>
    readonly maxValue2: FieldRef<"FormStep", 'Float'>
    readonly defaultValue2: FieldRef<"FormStep", 'Float'>
    readonly conditionalOn: FieldRef<"FormStep", 'Json'>
    readonly createdAt: FieldRef<"FormStep", 'DateTime'>
    readonly updatedAt: FieldRef<"FormStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormStep findUnique
   */
  export type FormStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * Filter, which FormStep to fetch.
     */
    where: FormStepWhereUniqueInput
  }

  /**
   * FormStep findUniqueOrThrow
   */
  export type FormStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * Filter, which FormStep to fetch.
     */
    where: FormStepWhereUniqueInput
  }

  /**
   * FormStep findFirst
   */
  export type FormStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * Filter, which FormStep to fetch.
     */
    where?: FormStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormSteps to fetch.
     */
    orderBy?: FormStepOrderByWithRelationInput | FormStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormSteps.
     */
    cursor?: FormStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormSteps.
     */
    distinct?: FormStepScalarFieldEnum | FormStepScalarFieldEnum[]
  }

  /**
   * FormStep findFirstOrThrow
   */
  export type FormStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * Filter, which FormStep to fetch.
     */
    where?: FormStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormSteps to fetch.
     */
    orderBy?: FormStepOrderByWithRelationInput | FormStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormSteps.
     */
    cursor?: FormStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormSteps.
     */
    distinct?: FormStepScalarFieldEnum | FormStepScalarFieldEnum[]
  }

  /**
   * FormStep findMany
   */
  export type FormStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * Filter, which FormSteps to fetch.
     */
    where?: FormStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormSteps to fetch.
     */
    orderBy?: FormStepOrderByWithRelationInput | FormStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormSteps.
     */
    cursor?: FormStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormSteps.
     */
    skip?: number
    distinct?: FormStepScalarFieldEnum | FormStepScalarFieldEnum[]
  }

  /**
   * FormStep create
   */
  export type FormStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * The data needed to create a FormStep.
     */
    data: XOR<FormStepCreateInput, FormStepUncheckedCreateInput>
  }

  /**
   * FormStep createMany
   */
  export type FormStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormSteps.
     */
    data: FormStepCreateManyInput | FormStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormStep createManyAndReturn
   */
  export type FormStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * The data used to create many FormSteps.
     */
    data: FormStepCreateManyInput | FormStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FormStep update
   */
  export type FormStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * The data needed to update a FormStep.
     */
    data: XOR<FormStepUpdateInput, FormStepUncheckedUpdateInput>
    /**
     * Choose, which FormStep to update.
     */
    where: FormStepWhereUniqueInput
  }

  /**
   * FormStep updateMany
   */
  export type FormStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormSteps.
     */
    data: XOR<FormStepUpdateManyMutationInput, FormStepUncheckedUpdateManyInput>
    /**
     * Filter which FormSteps to update
     */
    where?: FormStepWhereInput
    /**
     * Limit how many FormSteps to update.
     */
    limit?: number
  }

  /**
   * FormStep updateManyAndReturn
   */
  export type FormStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * The data used to update FormSteps.
     */
    data: XOR<FormStepUpdateManyMutationInput, FormStepUncheckedUpdateManyInput>
    /**
     * Filter which FormSteps to update
     */
    where?: FormStepWhereInput
    /**
     * Limit how many FormSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FormStep upsert
   */
  export type FormStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * The filter to search for the FormStep to update in case it exists.
     */
    where: FormStepWhereUniqueInput
    /**
     * In case the FormStep found by the `where` argument doesn't exist, create a new FormStep with this data.
     */
    create: XOR<FormStepCreateInput, FormStepUncheckedCreateInput>
    /**
     * In case the FormStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormStepUpdateInput, FormStepUncheckedUpdateInput>
  }

  /**
   * FormStep delete
   */
  export type FormStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
    /**
     * Filter which FormStep to delete.
     */
    where: FormStepWhereUniqueInput
  }

  /**
   * FormStep deleteMany
   */
  export type FormStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormSteps to delete
     */
    where?: FormStepWhereInput
    /**
     * Limit how many FormSteps to delete.
     */
    limit?: number
  }

  /**
   * FormStep.options
   */
  export type FormStep$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    where?: StepOptionWhereInput
    orderBy?: StepOptionOrderByWithRelationInput | StepOptionOrderByWithRelationInput[]
    cursor?: StepOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StepOptionScalarFieldEnum | StepOptionScalarFieldEnum[]
  }

  /**
   * FormStep without action
   */
  export type FormStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormStep
     */
    select?: FormStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormStep
     */
    omit?: FormStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormStepInclude<ExtArgs> | null
  }


  /**
   * Model StepOption
   */

  export type AggregateStepOption = {
    _count: StepOptionCountAggregateOutputType | null
    _avg: StepOptionAvgAggregateOutputType | null
    _sum: StepOptionSumAggregateOutputType | null
    _min: StepOptionMinAggregateOutputType | null
    _max: StepOptionMaxAggregateOutputType | null
  }

  export type StepOptionAvgAggregateOutputType = {
    questionNum: number | null
    price: number | null
    order: number | null
  }

  export type StepOptionSumAggregateOutputType = {
    questionNum: number | null
    price: number | null
    order: number | null
  }

  export type StepOptionMinAggregateOutputType = {
    id: string | null
    stepId: string | null
    questionNum: number | null
    label: string | null
    value: string | null
    price: number | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StepOptionMaxAggregateOutputType = {
    id: string | null
    stepId: string | null
    questionNum: number | null
    label: string | null
    value: string | null
    price: number | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StepOptionCountAggregateOutputType = {
    id: number
    stepId: number
    questionNum: number
    label: number
    value: number
    price: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StepOptionAvgAggregateInputType = {
    questionNum?: true
    price?: true
    order?: true
  }

  export type StepOptionSumAggregateInputType = {
    questionNum?: true
    price?: true
    order?: true
  }

  export type StepOptionMinAggregateInputType = {
    id?: true
    stepId?: true
    questionNum?: true
    label?: true
    value?: true
    price?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StepOptionMaxAggregateInputType = {
    id?: true
    stepId?: true
    questionNum?: true
    label?: true
    value?: true
    price?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StepOptionCountAggregateInputType = {
    id?: true
    stepId?: true
    questionNum?: true
    label?: true
    value?: true
    price?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StepOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StepOption to aggregate.
     */
    where?: StepOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepOptions to fetch.
     */
    orderBy?: StepOptionOrderByWithRelationInput | StepOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StepOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StepOptions
    **/
    _count?: true | StepOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StepOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StepOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StepOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StepOptionMaxAggregateInputType
  }

  export type GetStepOptionAggregateType<T extends StepOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateStepOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStepOption[P]>
      : GetScalarType<T[P], AggregateStepOption[P]>
  }




  export type StepOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepOptionWhereInput
    orderBy?: StepOptionOrderByWithAggregationInput | StepOptionOrderByWithAggregationInput[]
    by: StepOptionScalarFieldEnum[] | StepOptionScalarFieldEnum
    having?: StepOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StepOptionCountAggregateInputType | true
    _avg?: StepOptionAvgAggregateInputType
    _sum?: StepOptionSumAggregateInputType
    _min?: StepOptionMinAggregateInputType
    _max?: StepOptionMaxAggregateInputType
  }

  export type StepOptionGroupByOutputType = {
    id: string
    stepId: string
    questionNum: number
    label: string
    value: string
    price: number | null
    order: number
    createdAt: Date
    updatedAt: Date
    _count: StepOptionCountAggregateOutputType | null
    _avg: StepOptionAvgAggregateOutputType | null
    _sum: StepOptionSumAggregateOutputType | null
    _min: StepOptionMinAggregateOutputType | null
    _max: StepOptionMaxAggregateOutputType | null
  }

  type GetStepOptionGroupByPayload<T extends StepOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StepOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StepOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StepOptionGroupByOutputType[P]>
            : GetScalarType<T[P], StepOptionGroupByOutputType[P]>
        }
      >
    >


  export type StepOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    questionNum?: boolean
    label?: boolean
    value?: boolean
    price?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    step?: boolean | FormStepDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepOption"]>

  export type StepOptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    questionNum?: boolean
    label?: boolean
    value?: boolean
    price?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    step?: boolean | FormStepDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepOption"]>

  export type StepOptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    questionNum?: boolean
    label?: boolean
    value?: boolean
    price?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    step?: boolean | FormStepDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepOption"]>

  export type StepOptionSelectScalar = {
    id?: boolean
    stepId?: boolean
    questionNum?: boolean
    label?: boolean
    value?: boolean
    price?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StepOptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stepId" | "questionNum" | "label" | "value" | "price" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["stepOption"]>
  export type StepOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    step?: boolean | FormStepDefaultArgs<ExtArgs>
  }
  export type StepOptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    step?: boolean | FormStepDefaultArgs<ExtArgs>
  }
  export type StepOptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    step?: boolean | FormStepDefaultArgs<ExtArgs>
  }

  export type $StepOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StepOption"
    objects: {
      step: Prisma.$FormStepPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stepId: string
      questionNum: number
      label: string
      value: string
      price: number | null
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stepOption"]>
    composites: {}
  }

  type StepOptionGetPayload<S extends boolean | null | undefined | StepOptionDefaultArgs> = $Result.GetResult<Prisma.$StepOptionPayload, S>

  type StepOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StepOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StepOptionCountAggregateInputType | true
    }

  export interface StepOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StepOption'], meta: { name: 'StepOption' } }
    /**
     * Find zero or one StepOption that matches the filter.
     * @param {StepOptionFindUniqueArgs} args - Arguments to find a StepOption
     * @example
     * // Get one StepOption
     * const stepOption = await prisma.stepOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StepOptionFindUniqueArgs>(args: SelectSubset<T, StepOptionFindUniqueArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StepOption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StepOptionFindUniqueOrThrowArgs} args - Arguments to find a StepOption
     * @example
     * // Get one StepOption
     * const stepOption = await prisma.stepOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StepOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, StepOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StepOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionFindFirstArgs} args - Arguments to find a StepOption
     * @example
     * // Get one StepOption
     * const stepOption = await prisma.stepOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StepOptionFindFirstArgs>(args?: SelectSubset<T, StepOptionFindFirstArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StepOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionFindFirstOrThrowArgs} args - Arguments to find a StepOption
     * @example
     * // Get one StepOption
     * const stepOption = await prisma.stepOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StepOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, StepOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StepOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StepOptions
     * const stepOptions = await prisma.stepOption.findMany()
     * 
     * // Get first 10 StepOptions
     * const stepOptions = await prisma.stepOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stepOptionWithIdOnly = await prisma.stepOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StepOptionFindManyArgs>(args?: SelectSubset<T, StepOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StepOption.
     * @param {StepOptionCreateArgs} args - Arguments to create a StepOption.
     * @example
     * // Create one StepOption
     * const StepOption = await prisma.stepOption.create({
     *   data: {
     *     // ... data to create a StepOption
     *   }
     * })
     * 
     */
    create<T extends StepOptionCreateArgs>(args: SelectSubset<T, StepOptionCreateArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StepOptions.
     * @param {StepOptionCreateManyArgs} args - Arguments to create many StepOptions.
     * @example
     * // Create many StepOptions
     * const stepOption = await prisma.stepOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StepOptionCreateManyArgs>(args?: SelectSubset<T, StepOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StepOptions and returns the data saved in the database.
     * @param {StepOptionCreateManyAndReturnArgs} args - Arguments to create many StepOptions.
     * @example
     * // Create many StepOptions
     * const stepOption = await prisma.stepOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StepOptions and only return the `id`
     * const stepOptionWithIdOnly = await prisma.stepOption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StepOptionCreateManyAndReturnArgs>(args?: SelectSubset<T, StepOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StepOption.
     * @param {StepOptionDeleteArgs} args - Arguments to delete one StepOption.
     * @example
     * // Delete one StepOption
     * const StepOption = await prisma.stepOption.delete({
     *   where: {
     *     // ... filter to delete one StepOption
     *   }
     * })
     * 
     */
    delete<T extends StepOptionDeleteArgs>(args: SelectSubset<T, StepOptionDeleteArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StepOption.
     * @param {StepOptionUpdateArgs} args - Arguments to update one StepOption.
     * @example
     * // Update one StepOption
     * const stepOption = await prisma.stepOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StepOptionUpdateArgs>(args: SelectSubset<T, StepOptionUpdateArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StepOptions.
     * @param {StepOptionDeleteManyArgs} args - Arguments to filter StepOptions to delete.
     * @example
     * // Delete a few StepOptions
     * const { count } = await prisma.stepOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StepOptionDeleteManyArgs>(args?: SelectSubset<T, StepOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StepOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StepOptions
     * const stepOption = await prisma.stepOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StepOptionUpdateManyArgs>(args: SelectSubset<T, StepOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StepOptions and returns the data updated in the database.
     * @param {StepOptionUpdateManyAndReturnArgs} args - Arguments to update many StepOptions.
     * @example
     * // Update many StepOptions
     * const stepOption = await prisma.stepOption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StepOptions and only return the `id`
     * const stepOptionWithIdOnly = await prisma.stepOption.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StepOptionUpdateManyAndReturnArgs>(args: SelectSubset<T, StepOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StepOption.
     * @param {StepOptionUpsertArgs} args - Arguments to update or create a StepOption.
     * @example
     * // Update or create a StepOption
     * const stepOption = await prisma.stepOption.upsert({
     *   create: {
     *     // ... data to create a StepOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StepOption we want to update
     *   }
     * })
     */
    upsert<T extends StepOptionUpsertArgs>(args: SelectSubset<T, StepOptionUpsertArgs<ExtArgs>>): Prisma__StepOptionClient<$Result.GetResult<Prisma.$StepOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StepOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionCountArgs} args - Arguments to filter StepOptions to count.
     * @example
     * // Count the number of StepOptions
     * const count = await prisma.stepOption.count({
     *   where: {
     *     // ... the filter for the StepOptions we want to count
     *   }
     * })
    **/
    count<T extends StepOptionCountArgs>(
      args?: Subset<T, StepOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StepOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StepOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StepOptionAggregateArgs>(args: Subset<T, StepOptionAggregateArgs>): Prisma.PrismaPromise<GetStepOptionAggregateType<T>>

    /**
     * Group by StepOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepOptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StepOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StepOptionGroupByArgs['orderBy'] }
        : { orderBy?: StepOptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StepOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStepOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StepOption model
   */
  readonly fields: StepOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StepOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StepOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    step<T extends FormStepDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormStepDefaultArgs<ExtArgs>>): Prisma__FormStepClient<$Result.GetResult<Prisma.$FormStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StepOption model
   */
  interface StepOptionFieldRefs {
    readonly id: FieldRef<"StepOption", 'String'>
    readonly stepId: FieldRef<"StepOption", 'String'>
    readonly questionNum: FieldRef<"StepOption", 'Int'>
    readonly label: FieldRef<"StepOption", 'String'>
    readonly value: FieldRef<"StepOption", 'String'>
    readonly price: FieldRef<"StepOption", 'Float'>
    readonly order: FieldRef<"StepOption", 'Int'>
    readonly createdAt: FieldRef<"StepOption", 'DateTime'>
    readonly updatedAt: FieldRef<"StepOption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StepOption findUnique
   */
  export type StepOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * Filter, which StepOption to fetch.
     */
    where: StepOptionWhereUniqueInput
  }

  /**
   * StepOption findUniqueOrThrow
   */
  export type StepOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * Filter, which StepOption to fetch.
     */
    where: StepOptionWhereUniqueInput
  }

  /**
   * StepOption findFirst
   */
  export type StepOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * Filter, which StepOption to fetch.
     */
    where?: StepOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepOptions to fetch.
     */
    orderBy?: StepOptionOrderByWithRelationInput | StepOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StepOptions.
     */
    cursor?: StepOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepOptions.
     */
    distinct?: StepOptionScalarFieldEnum | StepOptionScalarFieldEnum[]
  }

  /**
   * StepOption findFirstOrThrow
   */
  export type StepOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * Filter, which StepOption to fetch.
     */
    where?: StepOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepOptions to fetch.
     */
    orderBy?: StepOptionOrderByWithRelationInput | StepOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StepOptions.
     */
    cursor?: StepOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepOptions.
     */
    distinct?: StepOptionScalarFieldEnum | StepOptionScalarFieldEnum[]
  }

  /**
   * StepOption findMany
   */
  export type StepOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * Filter, which StepOptions to fetch.
     */
    where?: StepOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepOptions to fetch.
     */
    orderBy?: StepOptionOrderByWithRelationInput | StepOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StepOptions.
     */
    cursor?: StepOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepOptions.
     */
    skip?: number
    distinct?: StepOptionScalarFieldEnum | StepOptionScalarFieldEnum[]
  }

  /**
   * StepOption create
   */
  export type StepOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a StepOption.
     */
    data: XOR<StepOptionCreateInput, StepOptionUncheckedCreateInput>
  }

  /**
   * StepOption createMany
   */
  export type StepOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StepOptions.
     */
    data: StepOptionCreateManyInput | StepOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StepOption createManyAndReturn
   */
  export type StepOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * The data used to create many StepOptions.
     */
    data: StepOptionCreateManyInput | StepOptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StepOption update
   */
  export type StepOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a StepOption.
     */
    data: XOR<StepOptionUpdateInput, StepOptionUncheckedUpdateInput>
    /**
     * Choose, which StepOption to update.
     */
    where: StepOptionWhereUniqueInput
  }

  /**
   * StepOption updateMany
   */
  export type StepOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StepOptions.
     */
    data: XOR<StepOptionUpdateManyMutationInput, StepOptionUncheckedUpdateManyInput>
    /**
     * Filter which StepOptions to update
     */
    where?: StepOptionWhereInput
    /**
     * Limit how many StepOptions to update.
     */
    limit?: number
  }

  /**
   * StepOption updateManyAndReturn
   */
  export type StepOptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * The data used to update StepOptions.
     */
    data: XOR<StepOptionUpdateManyMutationInput, StepOptionUncheckedUpdateManyInput>
    /**
     * Filter which StepOptions to update
     */
    where?: StepOptionWhereInput
    /**
     * Limit how many StepOptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StepOption upsert
   */
  export type StepOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the StepOption to update in case it exists.
     */
    where: StepOptionWhereUniqueInput
    /**
     * In case the StepOption found by the `where` argument doesn't exist, create a new StepOption with this data.
     */
    create: XOR<StepOptionCreateInput, StepOptionUncheckedCreateInput>
    /**
     * In case the StepOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StepOptionUpdateInput, StepOptionUncheckedUpdateInput>
  }

  /**
   * StepOption delete
   */
  export type StepOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
    /**
     * Filter which StepOption to delete.
     */
    where: StepOptionWhereUniqueInput
  }

  /**
   * StepOption deleteMany
   */
  export type StepOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StepOptions to delete
     */
    where?: StepOptionWhereInput
    /**
     * Limit how many StepOptions to delete.
     */
    limit?: number
  }

  /**
   * StepOption without action
   */
  export type StepOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepOption
     */
    select?: StepOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepOption
     */
    omit?: StepOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepOptionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    baseImage: 'baseImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const FormStepScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    order: 'order',
    type1: 'type1',
    question1: 'question1',
    required1: 'required1',
    type2: 'type2',
    question2: 'question2',
    required2: 'required2',
    pricingImpact1: 'pricingImpact1',
    pricePerUnit1: 'pricePerUnit1',
    unit1: 'unit1',
    minValue1: 'minValue1',
    maxValue1: 'maxValue1',
    defaultValue1: 'defaultValue1',
    pricingImpact2: 'pricingImpact2',
    pricePerUnit2: 'pricePerUnit2',
    unit2: 'unit2',
    minValue2: 'minValue2',
    maxValue2: 'maxValue2',
    defaultValue2: 'defaultValue2',
    conditionalOn: 'conditionalOn',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FormStepScalarFieldEnum = (typeof FormStepScalarFieldEnum)[keyof typeof FormStepScalarFieldEnum]


  export const StepOptionScalarFieldEnum: {
    id: 'id',
    stepId: 'stepId',
    questionNum: 'questionNum',
    label: 'label',
    value: 'value',
    price: 'price',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StepOptionScalarFieldEnum = (typeof StepOptionScalarFieldEnum)[keyof typeof StepOptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StepType'
   */
  export type EnumStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StepType'>
    


  /**
   * Reference to a field of type 'StepType[]'
   */
  export type ListEnumStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StepType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PricingImpact'
   */
  export type EnumPricingImpactFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PricingImpact'>
    


  /**
   * Reference to a field of type 'PricingImpact[]'
   */
  export type ListEnumPricingImpactFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PricingImpact[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    baseImage?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    steps?: FormStepListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    baseImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    steps?: FormStepOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    baseImage?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    steps?: FormStepListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    baseImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    baseImage?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type FormStepWhereInput = {
    AND?: FormStepWhereInput | FormStepWhereInput[]
    OR?: FormStepWhereInput[]
    NOT?: FormStepWhereInput | FormStepWhereInput[]
    id?: StringFilter<"FormStep"> | string
    productId?: StringFilter<"FormStep"> | string
    order?: IntFilter<"FormStep"> | number
    type1?: EnumStepTypeFilter<"FormStep"> | $Enums.StepType
    question1?: StringFilter<"FormStep"> | string
    required1?: BoolFilter<"FormStep"> | boolean
    type2?: EnumStepTypeNullableFilter<"FormStep"> | $Enums.StepType | null
    question2?: StringNullableFilter<"FormStep"> | string | null
    required2?: BoolFilter<"FormStep"> | boolean
    pricingImpact1?: EnumPricingImpactFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit1?: FloatNullableFilter<"FormStep"> | number | null
    unit1?: StringNullableFilter<"FormStep"> | string | null
    minValue1?: FloatNullableFilter<"FormStep"> | number | null
    maxValue1?: FloatNullableFilter<"FormStep"> | number | null
    defaultValue1?: FloatNullableFilter<"FormStep"> | number | null
    pricingImpact2?: EnumPricingImpactFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit2?: FloatNullableFilter<"FormStep"> | number | null
    unit2?: StringNullableFilter<"FormStep"> | string | null
    minValue2?: FloatNullableFilter<"FormStep"> | number | null
    maxValue2?: FloatNullableFilter<"FormStep"> | number | null
    defaultValue2?: FloatNullableFilter<"FormStep"> | number | null
    conditionalOn?: JsonNullableFilter<"FormStep">
    createdAt?: DateTimeFilter<"FormStep"> | Date | string
    updatedAt?: DateTimeFilter<"FormStep"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    options?: StepOptionListRelationFilter
  }

  export type FormStepOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
    type1?: SortOrder
    question1?: SortOrder
    required1?: SortOrder
    type2?: SortOrderInput | SortOrder
    question2?: SortOrderInput | SortOrder
    required2?: SortOrder
    pricingImpact1?: SortOrder
    pricePerUnit1?: SortOrderInput | SortOrder
    unit1?: SortOrderInput | SortOrder
    minValue1?: SortOrderInput | SortOrder
    maxValue1?: SortOrderInput | SortOrder
    defaultValue1?: SortOrderInput | SortOrder
    pricingImpact2?: SortOrder
    pricePerUnit2?: SortOrderInput | SortOrder
    unit2?: SortOrderInput | SortOrder
    minValue2?: SortOrderInput | SortOrder
    maxValue2?: SortOrderInput | SortOrder
    defaultValue2?: SortOrderInput | SortOrder
    conditionalOn?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    options?: StepOptionOrderByRelationAggregateInput
  }

  export type FormStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_order?: FormStepProductIdOrderCompoundUniqueInput
    AND?: FormStepWhereInput | FormStepWhereInput[]
    OR?: FormStepWhereInput[]
    NOT?: FormStepWhereInput | FormStepWhereInput[]
    productId?: StringFilter<"FormStep"> | string
    order?: IntFilter<"FormStep"> | number
    type1?: EnumStepTypeFilter<"FormStep"> | $Enums.StepType
    question1?: StringFilter<"FormStep"> | string
    required1?: BoolFilter<"FormStep"> | boolean
    type2?: EnumStepTypeNullableFilter<"FormStep"> | $Enums.StepType | null
    question2?: StringNullableFilter<"FormStep"> | string | null
    required2?: BoolFilter<"FormStep"> | boolean
    pricingImpact1?: EnumPricingImpactFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit1?: FloatNullableFilter<"FormStep"> | number | null
    unit1?: StringNullableFilter<"FormStep"> | string | null
    minValue1?: FloatNullableFilter<"FormStep"> | number | null
    maxValue1?: FloatNullableFilter<"FormStep"> | number | null
    defaultValue1?: FloatNullableFilter<"FormStep"> | number | null
    pricingImpact2?: EnumPricingImpactFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit2?: FloatNullableFilter<"FormStep"> | number | null
    unit2?: StringNullableFilter<"FormStep"> | string | null
    minValue2?: FloatNullableFilter<"FormStep"> | number | null
    maxValue2?: FloatNullableFilter<"FormStep"> | number | null
    defaultValue2?: FloatNullableFilter<"FormStep"> | number | null
    conditionalOn?: JsonNullableFilter<"FormStep">
    createdAt?: DateTimeFilter<"FormStep"> | Date | string
    updatedAt?: DateTimeFilter<"FormStep"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    options?: StepOptionListRelationFilter
  }, "id" | "productId_order">

  export type FormStepOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
    type1?: SortOrder
    question1?: SortOrder
    required1?: SortOrder
    type2?: SortOrderInput | SortOrder
    question2?: SortOrderInput | SortOrder
    required2?: SortOrder
    pricingImpact1?: SortOrder
    pricePerUnit1?: SortOrderInput | SortOrder
    unit1?: SortOrderInput | SortOrder
    minValue1?: SortOrderInput | SortOrder
    maxValue1?: SortOrderInput | SortOrder
    defaultValue1?: SortOrderInput | SortOrder
    pricingImpact2?: SortOrder
    pricePerUnit2?: SortOrderInput | SortOrder
    unit2?: SortOrderInput | SortOrder
    minValue2?: SortOrderInput | SortOrder
    maxValue2?: SortOrderInput | SortOrder
    defaultValue2?: SortOrderInput | SortOrder
    conditionalOn?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FormStepCountOrderByAggregateInput
    _avg?: FormStepAvgOrderByAggregateInput
    _max?: FormStepMaxOrderByAggregateInput
    _min?: FormStepMinOrderByAggregateInput
    _sum?: FormStepSumOrderByAggregateInput
  }

  export type FormStepScalarWhereWithAggregatesInput = {
    AND?: FormStepScalarWhereWithAggregatesInput | FormStepScalarWhereWithAggregatesInput[]
    OR?: FormStepScalarWhereWithAggregatesInput[]
    NOT?: FormStepScalarWhereWithAggregatesInput | FormStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FormStep"> | string
    productId?: StringWithAggregatesFilter<"FormStep"> | string
    order?: IntWithAggregatesFilter<"FormStep"> | number
    type1?: EnumStepTypeWithAggregatesFilter<"FormStep"> | $Enums.StepType
    question1?: StringWithAggregatesFilter<"FormStep"> | string
    required1?: BoolWithAggregatesFilter<"FormStep"> | boolean
    type2?: EnumStepTypeNullableWithAggregatesFilter<"FormStep"> | $Enums.StepType | null
    question2?: StringNullableWithAggregatesFilter<"FormStep"> | string | null
    required2?: BoolWithAggregatesFilter<"FormStep"> | boolean
    pricingImpact1?: EnumPricingImpactWithAggregatesFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit1?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    unit1?: StringNullableWithAggregatesFilter<"FormStep"> | string | null
    minValue1?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    maxValue1?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    defaultValue1?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    pricingImpact2?: EnumPricingImpactWithAggregatesFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit2?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    unit2?: StringNullableWithAggregatesFilter<"FormStep"> | string | null
    minValue2?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    maxValue2?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    defaultValue2?: FloatNullableWithAggregatesFilter<"FormStep"> | number | null
    conditionalOn?: JsonNullableWithAggregatesFilter<"FormStep">
    createdAt?: DateTimeWithAggregatesFilter<"FormStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FormStep"> | Date | string
  }

  export type StepOptionWhereInput = {
    AND?: StepOptionWhereInput | StepOptionWhereInput[]
    OR?: StepOptionWhereInput[]
    NOT?: StepOptionWhereInput | StepOptionWhereInput[]
    id?: StringFilter<"StepOption"> | string
    stepId?: StringFilter<"StepOption"> | string
    questionNum?: IntFilter<"StepOption"> | number
    label?: StringFilter<"StepOption"> | string
    value?: StringFilter<"StepOption"> | string
    price?: FloatNullableFilter<"StepOption"> | number | null
    order?: IntFilter<"StepOption"> | number
    createdAt?: DateTimeFilter<"StepOption"> | Date | string
    updatedAt?: DateTimeFilter<"StepOption"> | Date | string
    step?: XOR<FormStepScalarRelationFilter, FormStepWhereInput>
  }

  export type StepOptionOrderByWithRelationInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNum?: SortOrder
    label?: SortOrder
    value?: SortOrder
    price?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    step?: FormStepOrderByWithRelationInput
  }

  export type StepOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stepId_questionNum_order?: StepOptionStepIdQuestionNumOrderCompoundUniqueInput
    AND?: StepOptionWhereInput | StepOptionWhereInput[]
    OR?: StepOptionWhereInput[]
    NOT?: StepOptionWhereInput | StepOptionWhereInput[]
    stepId?: StringFilter<"StepOption"> | string
    questionNum?: IntFilter<"StepOption"> | number
    label?: StringFilter<"StepOption"> | string
    value?: StringFilter<"StepOption"> | string
    price?: FloatNullableFilter<"StepOption"> | number | null
    order?: IntFilter<"StepOption"> | number
    createdAt?: DateTimeFilter<"StepOption"> | Date | string
    updatedAt?: DateTimeFilter<"StepOption"> | Date | string
    step?: XOR<FormStepScalarRelationFilter, FormStepWhereInput>
  }, "id" | "stepId_questionNum_order">

  export type StepOptionOrderByWithAggregationInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNum?: SortOrder
    label?: SortOrder
    value?: SortOrder
    price?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StepOptionCountOrderByAggregateInput
    _avg?: StepOptionAvgOrderByAggregateInput
    _max?: StepOptionMaxOrderByAggregateInput
    _min?: StepOptionMinOrderByAggregateInput
    _sum?: StepOptionSumOrderByAggregateInput
  }

  export type StepOptionScalarWhereWithAggregatesInput = {
    AND?: StepOptionScalarWhereWithAggregatesInput | StepOptionScalarWhereWithAggregatesInput[]
    OR?: StepOptionScalarWhereWithAggregatesInput[]
    NOT?: StepOptionScalarWhereWithAggregatesInput | StepOptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StepOption"> | string
    stepId?: StringWithAggregatesFilter<"StepOption"> | string
    questionNum?: IntWithAggregatesFilter<"StepOption"> | number
    label?: StringWithAggregatesFilter<"StepOption"> | string
    value?: StringWithAggregatesFilter<"StepOption"> | string
    price?: FloatNullableWithAggregatesFilter<"StepOption"> | number | null
    order?: IntWithAggregatesFilter<"StepOption"> | number
    createdAt?: DateTimeWithAggregatesFilter<"StepOption"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StepOption"> | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    baseImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: FormStepCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    baseImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: FormStepUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baseImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: FormStepUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baseImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: FormStepUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    baseImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baseImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baseImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormStepCreateInput = {
    id?: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutStepsInput
    options?: StepOptionCreateNestedManyWithoutStepInput
  }

  export type FormStepUncheckedCreateInput = {
    id?: string
    productId: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: StepOptionUncheckedCreateNestedManyWithoutStepInput
  }

  export type FormStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutStepsNestedInput
    options?: StepOptionUpdateManyWithoutStepNestedInput
  }

  export type FormStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: StepOptionUncheckedUpdateManyWithoutStepNestedInput
  }

  export type FormStepCreateManyInput = {
    id?: string
    productId: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionCreateInput = {
    id?: string
    questionNum?: number
    label: string
    value: string
    price?: number | null
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    step: FormStepCreateNestedOneWithoutOptionsInput
  }

  export type StepOptionUncheckedCreateInput = {
    id?: string
    stepId: string
    questionNum?: number
    label: string
    value: string
    price?: number | null
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepOptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    step?: FormStepUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type StepOptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionCreateManyInput = {
    id?: string
    stepId: string
    questionNum?: number
    label: string
    value: string
    price?: number | null
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepOptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FormStepListRelationFilter = {
    every?: FormStepWhereInput
    some?: FormStepWhereInput
    none?: FormStepWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FormStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    baseImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    baseImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    baseImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStepTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeFilter<$PrismaModel> | $Enums.StepType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumStepTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStepTypeNullableFilter<$PrismaModel> | $Enums.StepType | null
  }

  export type EnumPricingImpactFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingImpact | EnumPricingImpactFieldRefInput<$PrismaModel>
    in?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingImpactFilter<$PrismaModel> | $Enums.PricingImpact
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type StepOptionListRelationFilter = {
    every?: StepOptionWhereInput
    some?: StepOptionWhereInput
    none?: StepOptionWhereInput
  }

  export type StepOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormStepProductIdOrderCompoundUniqueInput = {
    productId: string
    order: number
  }

  export type FormStepCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
    type1?: SortOrder
    question1?: SortOrder
    required1?: SortOrder
    type2?: SortOrder
    question2?: SortOrder
    required2?: SortOrder
    pricingImpact1?: SortOrder
    pricePerUnit1?: SortOrder
    unit1?: SortOrder
    minValue1?: SortOrder
    maxValue1?: SortOrder
    defaultValue1?: SortOrder
    pricingImpact2?: SortOrder
    pricePerUnit2?: SortOrder
    unit2?: SortOrder
    minValue2?: SortOrder
    maxValue2?: SortOrder
    defaultValue2?: SortOrder
    conditionalOn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormStepAvgOrderByAggregateInput = {
    order?: SortOrder
    pricePerUnit1?: SortOrder
    minValue1?: SortOrder
    maxValue1?: SortOrder
    defaultValue1?: SortOrder
    pricePerUnit2?: SortOrder
    minValue2?: SortOrder
    maxValue2?: SortOrder
    defaultValue2?: SortOrder
  }

  export type FormStepMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
    type1?: SortOrder
    question1?: SortOrder
    required1?: SortOrder
    type2?: SortOrder
    question2?: SortOrder
    required2?: SortOrder
    pricingImpact1?: SortOrder
    pricePerUnit1?: SortOrder
    unit1?: SortOrder
    minValue1?: SortOrder
    maxValue1?: SortOrder
    defaultValue1?: SortOrder
    pricingImpact2?: SortOrder
    pricePerUnit2?: SortOrder
    unit2?: SortOrder
    minValue2?: SortOrder
    maxValue2?: SortOrder
    defaultValue2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormStepMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
    type1?: SortOrder
    question1?: SortOrder
    required1?: SortOrder
    type2?: SortOrder
    question2?: SortOrder
    required2?: SortOrder
    pricingImpact1?: SortOrder
    pricePerUnit1?: SortOrder
    unit1?: SortOrder
    minValue1?: SortOrder
    maxValue1?: SortOrder
    defaultValue1?: SortOrder
    pricingImpact2?: SortOrder
    pricePerUnit2?: SortOrder
    unit2?: SortOrder
    minValue2?: SortOrder
    maxValue2?: SortOrder
    defaultValue2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormStepSumOrderByAggregateInput = {
    order?: SortOrder
    pricePerUnit1?: SortOrder
    minValue1?: SortOrder
    maxValue1?: SortOrder
    defaultValue1?: SortOrder
    pricePerUnit2?: SortOrder
    minValue2?: SortOrder
    maxValue2?: SortOrder
    defaultValue2?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStepTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeWithAggregatesFilter<$PrismaModel> | $Enums.StepType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStepTypeFilter<$PrismaModel>
    _max?: NestedEnumStepTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumStepTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStepTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.StepType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStepTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumStepTypeNullableFilter<$PrismaModel>
  }

  export type EnumPricingImpactWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingImpact | EnumPricingImpactFieldRefInput<$PrismaModel>
    in?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingImpactWithAggregatesFilter<$PrismaModel> | $Enums.PricingImpact
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingImpactFilter<$PrismaModel>
    _max?: NestedEnumPricingImpactFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FormStepScalarRelationFilter = {
    is?: FormStepWhereInput
    isNot?: FormStepWhereInput
  }

  export type StepOptionStepIdQuestionNumOrderCompoundUniqueInput = {
    stepId: string
    questionNum: number
    order: number
  }

  export type StepOptionCountOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNum?: SortOrder
    label?: SortOrder
    value?: SortOrder
    price?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StepOptionAvgOrderByAggregateInput = {
    questionNum?: SortOrder
    price?: SortOrder
    order?: SortOrder
  }

  export type StepOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNum?: SortOrder
    label?: SortOrder
    value?: SortOrder
    price?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StepOptionMinOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNum?: SortOrder
    label?: SortOrder
    value?: SortOrder
    price?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StepOptionSumOrderByAggregateInput = {
    questionNum?: SortOrder
    price?: SortOrder
    order?: SortOrder
  }

  export type FormStepCreateNestedManyWithoutProductInput = {
    create?: XOR<FormStepCreateWithoutProductInput, FormStepUncheckedCreateWithoutProductInput> | FormStepCreateWithoutProductInput[] | FormStepUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FormStepCreateOrConnectWithoutProductInput | FormStepCreateOrConnectWithoutProductInput[]
    createMany?: FormStepCreateManyProductInputEnvelope
    connect?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
  }

  export type FormStepUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<FormStepCreateWithoutProductInput, FormStepUncheckedCreateWithoutProductInput> | FormStepCreateWithoutProductInput[] | FormStepUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FormStepCreateOrConnectWithoutProductInput | FormStepCreateOrConnectWithoutProductInput[]
    createMany?: FormStepCreateManyProductInputEnvelope
    connect?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FormStepUpdateManyWithoutProductNestedInput = {
    create?: XOR<FormStepCreateWithoutProductInput, FormStepUncheckedCreateWithoutProductInput> | FormStepCreateWithoutProductInput[] | FormStepUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FormStepCreateOrConnectWithoutProductInput | FormStepCreateOrConnectWithoutProductInput[]
    upsert?: FormStepUpsertWithWhereUniqueWithoutProductInput | FormStepUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: FormStepCreateManyProductInputEnvelope
    set?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    disconnect?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    delete?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    connect?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    update?: FormStepUpdateWithWhereUniqueWithoutProductInput | FormStepUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: FormStepUpdateManyWithWhereWithoutProductInput | FormStepUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: FormStepScalarWhereInput | FormStepScalarWhereInput[]
  }

  export type FormStepUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<FormStepCreateWithoutProductInput, FormStepUncheckedCreateWithoutProductInput> | FormStepCreateWithoutProductInput[] | FormStepUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FormStepCreateOrConnectWithoutProductInput | FormStepCreateOrConnectWithoutProductInput[]
    upsert?: FormStepUpsertWithWhereUniqueWithoutProductInput | FormStepUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: FormStepCreateManyProductInputEnvelope
    set?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    disconnect?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    delete?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    connect?: FormStepWhereUniqueInput | FormStepWhereUniqueInput[]
    update?: FormStepUpdateWithWhereUniqueWithoutProductInput | FormStepUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: FormStepUpdateManyWithWhereWithoutProductInput | FormStepUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: FormStepScalarWhereInput | FormStepScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutStepsInput = {
    create?: XOR<ProductCreateWithoutStepsInput, ProductUncheckedCreateWithoutStepsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutStepsInput
    connect?: ProductWhereUniqueInput
  }

  export type StepOptionCreateNestedManyWithoutStepInput = {
    create?: XOR<StepOptionCreateWithoutStepInput, StepOptionUncheckedCreateWithoutStepInput> | StepOptionCreateWithoutStepInput[] | StepOptionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: StepOptionCreateOrConnectWithoutStepInput | StepOptionCreateOrConnectWithoutStepInput[]
    createMany?: StepOptionCreateManyStepInputEnvelope
    connect?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
  }

  export type StepOptionUncheckedCreateNestedManyWithoutStepInput = {
    create?: XOR<StepOptionCreateWithoutStepInput, StepOptionUncheckedCreateWithoutStepInput> | StepOptionCreateWithoutStepInput[] | StepOptionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: StepOptionCreateOrConnectWithoutStepInput | StepOptionCreateOrConnectWithoutStepInput[]
    createMany?: StepOptionCreateManyStepInputEnvelope
    connect?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStepTypeFieldUpdateOperationsInput = {
    set?: $Enums.StepType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumStepTypeFieldUpdateOperationsInput = {
    set?: $Enums.StepType | null
  }

  export type EnumPricingImpactFieldUpdateOperationsInput = {
    set?: $Enums.PricingImpact
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<ProductCreateWithoutStepsInput, ProductUncheckedCreateWithoutStepsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutStepsInput
    upsert?: ProductUpsertWithoutStepsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutStepsInput, ProductUpdateWithoutStepsInput>, ProductUncheckedUpdateWithoutStepsInput>
  }

  export type StepOptionUpdateManyWithoutStepNestedInput = {
    create?: XOR<StepOptionCreateWithoutStepInput, StepOptionUncheckedCreateWithoutStepInput> | StepOptionCreateWithoutStepInput[] | StepOptionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: StepOptionCreateOrConnectWithoutStepInput | StepOptionCreateOrConnectWithoutStepInput[]
    upsert?: StepOptionUpsertWithWhereUniqueWithoutStepInput | StepOptionUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: StepOptionCreateManyStepInputEnvelope
    set?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    disconnect?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    delete?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    connect?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    update?: StepOptionUpdateWithWhereUniqueWithoutStepInput | StepOptionUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: StepOptionUpdateManyWithWhereWithoutStepInput | StepOptionUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: StepOptionScalarWhereInput | StepOptionScalarWhereInput[]
  }

  export type StepOptionUncheckedUpdateManyWithoutStepNestedInput = {
    create?: XOR<StepOptionCreateWithoutStepInput, StepOptionUncheckedCreateWithoutStepInput> | StepOptionCreateWithoutStepInput[] | StepOptionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: StepOptionCreateOrConnectWithoutStepInput | StepOptionCreateOrConnectWithoutStepInput[]
    upsert?: StepOptionUpsertWithWhereUniqueWithoutStepInput | StepOptionUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: StepOptionCreateManyStepInputEnvelope
    set?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    disconnect?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    delete?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    connect?: StepOptionWhereUniqueInput | StepOptionWhereUniqueInput[]
    update?: StepOptionUpdateWithWhereUniqueWithoutStepInput | StepOptionUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: StepOptionUpdateManyWithWhereWithoutStepInput | StepOptionUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: StepOptionScalarWhereInput | StepOptionScalarWhereInput[]
  }

  export type FormStepCreateNestedOneWithoutOptionsInput = {
    create?: XOR<FormStepCreateWithoutOptionsInput, FormStepUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: FormStepCreateOrConnectWithoutOptionsInput
    connect?: FormStepWhereUniqueInput
  }

  export type FormStepUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<FormStepCreateWithoutOptionsInput, FormStepUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: FormStepCreateOrConnectWithoutOptionsInput
    upsert?: FormStepUpsertWithoutOptionsInput
    connect?: FormStepWhereUniqueInput
    update?: XOR<XOR<FormStepUpdateToOneWithWhereWithoutOptionsInput, FormStepUpdateWithoutOptionsInput>, FormStepUncheckedUpdateWithoutOptionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStepTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeFilter<$PrismaModel> | $Enums.StepType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumStepTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStepTypeNullableFilter<$PrismaModel> | $Enums.StepType | null
  }

  export type NestedEnumPricingImpactFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingImpact | EnumPricingImpactFieldRefInput<$PrismaModel>
    in?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingImpactFilter<$PrismaModel> | $Enums.PricingImpact
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStepTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStepTypeWithAggregatesFilter<$PrismaModel> | $Enums.StepType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStepTypeFilter<$PrismaModel>
    _max?: NestedEnumStepTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumStepTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepType | EnumStepTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.StepType[] | ListEnumStepTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumStepTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.StepType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumStepTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumStepTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPricingImpactWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingImpact | EnumPricingImpactFieldRefInput<$PrismaModel>
    in?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingImpact[] | ListEnumPricingImpactFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingImpactWithAggregatesFilter<$PrismaModel> | $Enums.PricingImpact
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingImpactFilter<$PrismaModel>
    _max?: NestedEnumPricingImpactFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FormStepCreateWithoutProductInput = {
    id?: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: StepOptionCreateNestedManyWithoutStepInput
  }

  export type FormStepUncheckedCreateWithoutProductInput = {
    id?: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: StepOptionUncheckedCreateNestedManyWithoutStepInput
  }

  export type FormStepCreateOrConnectWithoutProductInput = {
    where: FormStepWhereUniqueInput
    create: XOR<FormStepCreateWithoutProductInput, FormStepUncheckedCreateWithoutProductInput>
  }

  export type FormStepCreateManyProductInputEnvelope = {
    data: FormStepCreateManyProductInput | FormStepCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type FormStepUpsertWithWhereUniqueWithoutProductInput = {
    where: FormStepWhereUniqueInput
    update: XOR<FormStepUpdateWithoutProductInput, FormStepUncheckedUpdateWithoutProductInput>
    create: XOR<FormStepCreateWithoutProductInput, FormStepUncheckedCreateWithoutProductInput>
  }

  export type FormStepUpdateWithWhereUniqueWithoutProductInput = {
    where: FormStepWhereUniqueInput
    data: XOR<FormStepUpdateWithoutProductInput, FormStepUncheckedUpdateWithoutProductInput>
  }

  export type FormStepUpdateManyWithWhereWithoutProductInput = {
    where: FormStepScalarWhereInput
    data: XOR<FormStepUpdateManyMutationInput, FormStepUncheckedUpdateManyWithoutProductInput>
  }

  export type FormStepScalarWhereInput = {
    AND?: FormStepScalarWhereInput | FormStepScalarWhereInput[]
    OR?: FormStepScalarWhereInput[]
    NOT?: FormStepScalarWhereInput | FormStepScalarWhereInput[]
    id?: StringFilter<"FormStep"> | string
    productId?: StringFilter<"FormStep"> | string
    order?: IntFilter<"FormStep"> | number
    type1?: EnumStepTypeFilter<"FormStep"> | $Enums.StepType
    question1?: StringFilter<"FormStep"> | string
    required1?: BoolFilter<"FormStep"> | boolean
    type2?: EnumStepTypeNullableFilter<"FormStep"> | $Enums.StepType | null
    question2?: StringNullableFilter<"FormStep"> | string | null
    required2?: BoolFilter<"FormStep"> | boolean
    pricingImpact1?: EnumPricingImpactFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit1?: FloatNullableFilter<"FormStep"> | number | null
    unit1?: StringNullableFilter<"FormStep"> | string | null
    minValue1?: FloatNullableFilter<"FormStep"> | number | null
    maxValue1?: FloatNullableFilter<"FormStep"> | number | null
    defaultValue1?: FloatNullableFilter<"FormStep"> | number | null
    pricingImpact2?: EnumPricingImpactFilter<"FormStep"> | $Enums.PricingImpact
    pricePerUnit2?: FloatNullableFilter<"FormStep"> | number | null
    unit2?: StringNullableFilter<"FormStep"> | string | null
    minValue2?: FloatNullableFilter<"FormStep"> | number | null
    maxValue2?: FloatNullableFilter<"FormStep"> | number | null
    defaultValue2?: FloatNullableFilter<"FormStep"> | number | null
    conditionalOn?: JsonNullableFilter<"FormStep">
    createdAt?: DateTimeFilter<"FormStep"> | Date | string
    updatedAt?: DateTimeFilter<"FormStep"> | Date | string
  }

  export type ProductCreateWithoutStepsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    baseImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateWithoutStepsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    baseImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutStepsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutStepsInput, ProductUncheckedCreateWithoutStepsInput>
  }

  export type StepOptionCreateWithoutStepInput = {
    id?: string
    questionNum?: number
    label: string
    value: string
    price?: number | null
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepOptionUncheckedCreateWithoutStepInput = {
    id?: string
    questionNum?: number
    label: string
    value: string
    price?: number | null
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepOptionCreateOrConnectWithoutStepInput = {
    where: StepOptionWhereUniqueInput
    create: XOR<StepOptionCreateWithoutStepInput, StepOptionUncheckedCreateWithoutStepInput>
  }

  export type StepOptionCreateManyStepInputEnvelope = {
    data: StepOptionCreateManyStepInput | StepOptionCreateManyStepInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutStepsInput = {
    update: XOR<ProductUpdateWithoutStepsInput, ProductUncheckedUpdateWithoutStepsInput>
    create: XOR<ProductCreateWithoutStepsInput, ProductUncheckedCreateWithoutStepsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutStepsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutStepsInput, ProductUncheckedUpdateWithoutStepsInput>
  }

  export type ProductUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baseImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baseImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionUpsertWithWhereUniqueWithoutStepInput = {
    where: StepOptionWhereUniqueInput
    update: XOR<StepOptionUpdateWithoutStepInput, StepOptionUncheckedUpdateWithoutStepInput>
    create: XOR<StepOptionCreateWithoutStepInput, StepOptionUncheckedCreateWithoutStepInput>
  }

  export type StepOptionUpdateWithWhereUniqueWithoutStepInput = {
    where: StepOptionWhereUniqueInput
    data: XOR<StepOptionUpdateWithoutStepInput, StepOptionUncheckedUpdateWithoutStepInput>
  }

  export type StepOptionUpdateManyWithWhereWithoutStepInput = {
    where: StepOptionScalarWhereInput
    data: XOR<StepOptionUpdateManyMutationInput, StepOptionUncheckedUpdateManyWithoutStepInput>
  }

  export type StepOptionScalarWhereInput = {
    AND?: StepOptionScalarWhereInput | StepOptionScalarWhereInput[]
    OR?: StepOptionScalarWhereInput[]
    NOT?: StepOptionScalarWhereInput | StepOptionScalarWhereInput[]
    id?: StringFilter<"StepOption"> | string
    stepId?: StringFilter<"StepOption"> | string
    questionNum?: IntFilter<"StepOption"> | number
    label?: StringFilter<"StepOption"> | string
    value?: StringFilter<"StepOption"> | string
    price?: FloatNullableFilter<"StepOption"> | number | null
    order?: IntFilter<"StepOption"> | number
    createdAt?: DateTimeFilter<"StepOption"> | Date | string
    updatedAt?: DateTimeFilter<"StepOption"> | Date | string
  }

  export type FormStepCreateWithoutOptionsInput = {
    id?: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutStepsInput
  }

  export type FormStepUncheckedCreateWithoutOptionsInput = {
    id?: string
    productId: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormStepCreateOrConnectWithoutOptionsInput = {
    where: FormStepWhereUniqueInput
    create: XOR<FormStepCreateWithoutOptionsInput, FormStepUncheckedCreateWithoutOptionsInput>
  }

  export type FormStepUpsertWithoutOptionsInput = {
    update: XOR<FormStepUpdateWithoutOptionsInput, FormStepUncheckedUpdateWithoutOptionsInput>
    create: XOR<FormStepCreateWithoutOptionsInput, FormStepUncheckedCreateWithoutOptionsInput>
    where?: FormStepWhereInput
  }

  export type FormStepUpdateToOneWithWhereWithoutOptionsInput = {
    where?: FormStepWhereInput
    data: XOR<FormStepUpdateWithoutOptionsInput, FormStepUncheckedUpdateWithoutOptionsInput>
  }

  export type FormStepUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutStepsNestedInput
  }

  export type FormStepUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormStepCreateManyProductInput = {
    id?: string
    order: number
    type1: $Enums.StepType
    question1: string
    required1?: boolean
    type2?: $Enums.StepType | null
    question2?: string | null
    required2?: boolean
    pricingImpact1?: $Enums.PricingImpact
    pricePerUnit1?: number | null
    unit1?: string | null
    minValue1?: number | null
    maxValue1?: number | null
    defaultValue1?: number | null
    pricingImpact2?: $Enums.PricingImpact
    pricePerUnit2?: number | null
    unit2?: string | null
    minValue2?: number | null
    maxValue2?: number | null
    defaultValue2?: number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormStepUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: StepOptionUpdateManyWithoutStepNestedInput
  }

  export type FormStepUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: StepOptionUncheckedUpdateManyWithoutStepNestedInput
  }

  export type FormStepUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type1?: EnumStepTypeFieldUpdateOperationsInput | $Enums.StepType
    question1?: StringFieldUpdateOperationsInput | string
    required1?: BoolFieldUpdateOperationsInput | boolean
    type2?: NullableEnumStepTypeFieldUpdateOperationsInput | $Enums.StepType | null
    question2?: NullableStringFieldUpdateOperationsInput | string | null
    required2?: BoolFieldUpdateOperationsInput | boolean
    pricingImpact1?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit1?: NullableFloatFieldUpdateOperationsInput | number | null
    unit1?: NullableStringFieldUpdateOperationsInput | string | null
    minValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue1?: NullableFloatFieldUpdateOperationsInput | number | null
    pricingImpact2?: EnumPricingImpactFieldUpdateOperationsInput | $Enums.PricingImpact
    pricePerUnit2?: NullableFloatFieldUpdateOperationsInput | number | null
    unit2?: NullableStringFieldUpdateOperationsInput | string | null
    minValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    maxValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultValue2?: NullableFloatFieldUpdateOperationsInput | number | null
    conditionalOn?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionCreateManyStepInput = {
    id?: string
    questionNum?: number
    label: string
    value: string
    price?: number | null
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepOptionUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionUncheckedUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepOptionUncheckedUpdateManyWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNum?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}