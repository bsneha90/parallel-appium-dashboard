export class Test {

    constructor(name, result, device,testClassName ='testClassName',) {
        this.name = name;
        this.result = result;
        this.device = device;
        this.testClassName = testClassName
    }

    getName() {
        return this.name;
    }

    getResult() {
        return this.result;
    }

    getDeviceInfo() {
        return this.name;
    }

    getTestClassName() {
        return this.testClassName;
    }
}

