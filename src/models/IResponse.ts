interface IResponse {
  /** @format uuid */
  id?: string;
  isActive?: boolean;
  /** @format date-time */
  createdOn?: string;
  /** @format uuid */
  createdBy?: string;
}
