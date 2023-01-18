



//Algorithm for calculating quote price based on user input
const quotingAlgo = (input, setOutput) => {
    let markup = 0
    if (!input.returningclient) {
        markup += .02
    }
    switch (input.jobtype) {
        case "concrete":
            setOutput(input.sqft * markup + .16)
            break
        case "decking":
            setOutput(input.sqft * markup + .28)
            break
        case "fencing" && input.bothsides:
            setOutput(input.sqft * markup + .12)
            break
        case "fencing" && !input.bothsides:
            setOutput(input.sqft * markup + .09)
            break
        case "roofing" && input.twostories:
            setOutput("noSecondStoryRoofWash")
            break
        case "roofing" && !input.twostories:
            setOutput(input.sqft * markup + .20)
            break
        case "siding" && input.twostories:
            setOutput(input.sqft * markup + .14)
            break
        case "siding" && !input.twostories:
            setOutput(input.sqft * markup + .12)
        default:
            setOutput("Error: Invalid job type")
            break
    }
}

export default quotingAlgo