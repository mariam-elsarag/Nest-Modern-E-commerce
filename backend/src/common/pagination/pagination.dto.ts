import { Request } from 'express';

/**
 * Shared base class to build pagination URLs
 */
export class BasePagination<T> {
  protected buildUrl(
    page: number,
    route: string,
    query: Record<string, any> = {},
  ): string {
    const params = new URLSearchParams({
      ...query,
      page: page.toString(),
    });
    return `${route}?${params.toString()}`;
  }
}
export class FullPaginationDto<T> extends BasePagination<T> {
  page: number;
  pages: number;
  count: number;
  next: string | null;
  prev: string | null;
  results: T[];

  constructor(
    page: number,
    count: number,
    limit: number,
    req: Request,
    results: T[],
  ) {
    super();
    this.page = page;
    this.pages = Math.ceil(count / limit);
    this.count = count;
    this.results = results;

    const hasNext = page < this.pages;
    const hasPrev = page > 1;
    const route = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;

    this.next = hasNext ? this.buildUrl(page + 1, route, req.query) : null;
    this.prev = hasPrev ? this.buildUrl(page - 1, route, req.query) : null;
  }
}
