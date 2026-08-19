import student from '../assets/student.jpg'

export default function BuiltForStudent(){
    return (
        <section className="bg-[#f6f2f7] grid grid-cols-1 sm:grid-cols-2 py-6">
            <div className="max-w-full border my-3 border-purple-100 rounded-lg px-4 sm:px-6 py-4">
                <h4 className="font-semibold text-3xl py-3">Built for Students <br /> For Students</h4>
                <p className="font-normal text-[#424754] text-xl">We know the struggle of trying to sell old textbooks or find a decent couch at the beginning of the semester. CampusMarket eliminates the creep-factor of general classifieds by restricting access exclusively to verified university members.</p>
                
                <div className="py-3">
                    <li className="text-[#424754] text-xl">
                <span className="material-symbols-outlined text-primary">check_circle</span> No hidden fees or transaction cuts</li>
               <li className="text-[#424754] text-xl">
                <span className="material-symbols-outlined text-primary">check_circle</span> In-app messaging to keep your number private</li>
              <li className="text-[#424754] text-xl">
                <span className="material-symbols-outlined text-primary">check_circle</span> Report system to maintain community trust.</li>
              
                </div>

                <div className="py-3">       
                    <button className="border border-outline bg-surface rounded-lg  px-4 py-3 sm:py-3  text-md text-zinc-700 font-bold">Read Our Trusts and Safety Policy</button>
                </div>
            </div>            
            <div className="max-w-full">
                <img src={student.src} alt="student" className="w-full h-full rounded-lg" />
            </div>
        </section>
    )
}