<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>{{'Amount' | localize}}</th>
                <th>{{'Date' | localize}}</th>
                <th>{{'Category' | localize}}</th>
                <th>{{'Type' | localize}}</th>
                <th>{{'Open' | localize}}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, id) of records" :key="record.id">
                <td>{{id + 1}}</td>
                <td>{{record.amount | currency('SEK')}}</td>
                <td>{{record.date | date('datetime')}}</td>
                <td>{{record.categoryName}}</td>
                <td>
                    <span 
                    :class="[record.typeClass]"
                    class="white-text badge red"
                    >{{record.typeText}}</span>
                </td>
                <td>
                    <button
                    v-tooltip="'See_Full_Details'" 
                    class="btn-small btn" 
                    @click="$router.push('/history/details/' + record.id)">
                        <i class="material-icons">open_in_new</i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>