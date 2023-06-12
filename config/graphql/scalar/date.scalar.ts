import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';


  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  /**
   * Serializes a Date object into a string of the format "YYYY-MM-DD".
   *
   * @param {Date} value - the Date object to be serialized
   * @return {string} - the serialized string in the "YYYY-MM-DD" format
   */
  serialize(value: Date): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // months are zero-indexed
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  

  /**
   * Parses a GraphQL ValueNode representing a date and returns a Date object.
   *
   * @param {ValueNode} ast - The GraphQL ValueNode to parse.
   * @return {Date} A Date object representing the parsed date.
   */
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null as any;
  }
}