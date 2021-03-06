"""
tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from ..models import Profile, Location


class AuthTest(TestCase):
    """
    tests on authorization (signin, signout, signup)
    """
    csrftoken = 0
    sessionid = 0
    user = None
    client = Client()

    def setUp(self):
        user = get_user_model()
        self.user = user.objects.create_user(username='test', password='123')
        self.user.save()

    def tearDown(self):
        """ reset """
        self.csrftoken = 0
        self.sessionid = 0

    def test_signup(self):
        """ test login """
        userinfo = {'username': 'foo', 'password': 'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        # self.assertEqual(response.json()['id'], 2)

    def test_signup_existing_user(self):
        """ try signup with a taken user name"""
        userinfo = {'username': 'foo', 'password': 'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        userinfo = {'username': 'foo', 'password': 'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_signup_bad_request(self):
        """ try signup with bad request body; should be caught by the decorator """
        userinfo = {'badreqeust': 'foo', 'password': 'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signin(self):
        """ try signin """
        userinfo = {'username': 'test', 'password': '123'}
        response = self.client.post('/api/signin/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        # self.assertEqual(response.json()['id'], 1)

    def test_signin_no_user(self):
        """ try signin with non-existing user """
        userinfo = {'username': 'fake', 'password': 'user'}
        response = self.client.post('/api/signin/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 401)


class ProfileTest(TestCase):
    """ tests regarding profile creation """
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        user = get_user_model()
        user = user.objects.create_user(username='test', password='1234')
        user.save()
        self.location = Location.objects.create(
            name='home', longitude=123.123, latitude=99.99)
        self.location.save()

        # Create user profile
        profile = Profile.objects.get(user=user)
        profile.location_id = self.location
        profile.save()
        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_get_profile(self):
        """ Test getting profile of currently logged in user """
        response = self.client.get('/api/profile/')
        self.assertEqual(response.status_code, 200)

    def test_get_other_profile(self):
        """ Test getting profile of another user based on username """
        user = get_user_model()
        other_user = user.objects.create_user(
            username='other_user', password='1234')
        profile = Profile.objects.get(
            user=other_user)
        profile.location_id = self.location
        profile.save()
        response = self.client.get('/api/profile/other_user/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['username'], 'other_user')
