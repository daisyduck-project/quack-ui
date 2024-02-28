import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MembersService } from './members.service';
import { Credentials } from './credentials';
import { environment } from '../../environments/environment';

describe('MembersService', () => {
  let service: MembersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MembersService],
    });
    service = TestBed.inject(MembersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register credentials', inject(
    [HttpTestingController, MembersService],
    (httpMock: HttpTestingController, membersService: MembersService) => {
      const credentials: Credentials = {
        email: 'email@service.com',
        username: 'user',
        password: 'password'
      };

      membersService.registerCredentials(credentials).subscribe();

      const expectedUrl = environment.API_URL + '/members/v1/creds';
      const expectedHeaders = {
        'Content-Type': 'application/json',
      };

      const req = httpMock.expectOne({
        method: 'POST',
        url: expectedUrl,
      });

      expect(req.request.method).toEqual('POST');
      expect(req.request.url).toEqual(expectedUrl);
      expect(req.request.headers.get('Content-Type')).toEqual(
        expectedHeaders['Content-Type']
      );

      httpMock.verify();
    }
  ));
});
