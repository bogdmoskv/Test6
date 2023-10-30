const supertest = require('supertest');
const chai = require('chai');
const {faker} = require('@faker-js/faker');
const expect = chai.expect;

const url = 'https://gorest.co.in'
const request = supertest(url);

let createdUserId, createdPostId;
const [name, gender, email] = [faker.person.fullName(), faker.person.sex(), faker.internet.email()];
const [updatedName, updatedGender, updatedEmail] = [faker.person.fullName(), faker.person.sex(), faker.internet.email()];

describe('Users operations test', () => {
    it('should create a new user', (done) => {
        request
            .post('/public/v2/users')
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .send({
                "name": name,
                "gender": gender,
                "email": email,
                "status": "active"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.be.equal(name);
                expect(res.body.gender).to.be.equal(gender);
                expect(res.body.email).to.be.equal(email);
                createdUserId = res.body.id;
                done();
            });
    });

    it('should get user details', (done) => {
        request
            .get(`/public/v2/users/${createdUserId}`)
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should update user details', (done) => {
        request
            .put(`/public/v2/users/${createdUserId}`)
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .send({
                "name": updatedName,
                "gender": updatedGender,
                "email": updatedEmail,
                "status": "active"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.name).to.be.equal(updatedName);
                expect(res.body.gender).to.be.equal(updatedGender);
                expect(res.body.email).to.be.equal(updatedEmail);
                done();
            });
    });

    it('should create a new post', (done) => {
        request
            .post(`/public/v2/users/${createdUserId}/posts`)
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .send({
                "title": faker.lorem.sentence(),
                "body": faker.lorem.sentences(3)
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                createdPostId = res.body.id;
                done();
            });
    });

    it('should create a new comment', (done) => {
        request
            .post(`/public/v2/posts/${createdPostId}/comments`)
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .send({
                "post_id": createdPostId,
                "body": faker.lorem.sentences(3),
                "name": faker.person.fullName(),
                "email": faker.internet.email()
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should create a new todo', (done) => {
        request
            .post(`/public/v2/users/${createdUserId}/todos`)
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .send({
                "title": faker.lorem.sentence(),
                "status": "pending"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should delete a user', (done) => {
        request
            .delete(`/public/v2/users/${createdUserId}`)
            .set('Authorization', 'Bearer 2c382a80034e4c04958b27be81ebacb6906587e1a0d03f3e3eafd859bae2a6f9')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(204);
                done();
            });
    });
});
