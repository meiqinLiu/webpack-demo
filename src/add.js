export default function add (args) {
    return args.reduce((p,c)=>{
        return p+c
    },0)()
}