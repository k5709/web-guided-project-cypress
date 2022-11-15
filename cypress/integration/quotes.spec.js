import { text } from "express"

// write tests here
describe("Quotes App", () => {
    beforeEach(() => {
        //Each test needs fresh state
        //Tests shouldn't rely on the other tests
        //Every test should work in isolation

        cy.visit("http://localhost:1234") // Careful
    })

    //Helpers
    const textInput = () => cy.get("input[name=text]")
    const authorInput = () => cy.get("input[name=author]")
    const foobarInput = () => cy.get("input[name=foobar]")
    const submitBtn = () => cy.get(`button[id="submitBtn"]`)
    const cancelBtn = () => cy.get(`button[id="cancelBtn]`)

    it("sanity check to make sure tests are working", () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.equal(5);
        expect({}).not.to.equal({}) // is this true?
    })


    it("the proper elements are showing", () => {
        textInput().should("exist");
        authorInput().should("exist");
        foobarInput().should("exist");
        submitBtn().should("exist");
        cancelBtn().should("exist");

        cy.contains("Submit quote").should("exist");
        cy.contains(/submit quote/i).should("exist");
    })

    describe("filling out the inputs and cancelling", () => {
        it("can navigate to the site", () => {
            cy.url().should("include", "localhost");
        })

        it("submit button starts out disabled", () => {
            submitBtn().should("be disabled");
        })

        it("can type in the inputs", () => {
            textInput().should("have value", "")
                .type("css rules")
                .should("have.value", "css rules")

            authorInput()
                .should("have.value", "")
                .type("KARosales")
                .should("have.value", 'KARosales')
        })

        it("the submit button enables when both inputs are filled out", () => {
            authorInput().type("Kristian");
            textInput().type("this is fun");
            submitBtn().type("not.be.disabled");
        })

        it("the cancel button can be reset the inputs and disable the submit button", () => {
            authorInput().type("Kristian");
            textInput().type("Fun!!!!");
            cancelBtn().click();
            textInput().should("have.value", "");
            authorInput().should("have.value", "");
            submitBtn().should("be.disabled")
        })

    })


    describe("Adding a new quote", () => {
        it("can submit and build a new quote", () => {
            textInput().type("css rules");
            authorInput().type("KARosales")
            submitBtn().click();

            //It's important that state is the same at the beginning of each test!
            //We immediately delete that new post
            //Worst case, restart the server script (ctrl + c) and then run `npm run server`
            //In the real world you'll have a testing database
            cy.contains("css rules").siblings("button:nth-of-type(2)")
            cy.contains("kristian").should("not.exist")
        })

        it("variation of can submit a new quote", () => {
            cy.contains("css rules").should("not exist");
            textInput().type("css rules");
            authorInput().type("kristian");
            submitBtn().click();
            cy.contains("css rules");
            cy.contains("kristian");
            cy.contains("css rules").next().next().click();
            cy.contains("css rules").should("not.exist");
        })

    })







})