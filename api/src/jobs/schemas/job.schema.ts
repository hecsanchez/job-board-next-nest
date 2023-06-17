import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ _id: false })
class Coordinates {
  @Prop({ type: String, enum: ['Point'], required: true })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[];
}

@Schema({ _id: false })
class Location {
  @Prop()
  lat: number;

  @Prop()
  lon: number;

  @Prop({ type: Coordinates })
  coordinates: Coordinates;
}

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  _id: string;

  @Prop()
  body: string;

  @Prop()
  career_area_name: string;

  @Prop()
  city_name: string;

  @Prop()
  company_name: string;

  @Prop()
  company_raw: string;

  @Prop()
  edulevels_name: { value: string; id?: string }[];

  @Prop()
  employment_type_name: string;

  @Prop()
  expiredAt: Date | null;

  @Prop({ type: Location })
  location: Location;

  @Prop()
  max_salary: number;

  @Prop()
  min_edulevels_name: string;

  @Prop()
  min_salary: number;

  @Prop()
  min_years_experience?: number;

  @Prop()
  onet: string;

  @Prop()
  onet_name: string;

  @Prop()
  posted: Date;

  @Prop()
  remote_type: number;

  @Prop()
  remote_type_name: string;

  @Prop()
  riasec: string[];

  @Prop()
  salary: number;

  @Prop()
  skills_name: { value: string }[];

  @Prop()
  title_name: string;

  @Prop()
  title_raw: string;

  @Prop()
  is_earn_and_learn: boolean;

  @Prop()
  is_gateway_job: boolean;

  @Prop()
  url: { value: string }[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.index({ 'location.coordinates': '2dsphere' });
JobSchema.index({ posted: -1 });
JobSchema.index({
  title_name: 'text',
  title_raw: 'text',
  company_name: 'text',
  body: 'text',
});
